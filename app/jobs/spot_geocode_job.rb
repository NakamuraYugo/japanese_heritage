class SpotGeocodeJob < ApplicationJob
  queue_as :default

  # --- retry戦略のパラメータ（チューニングしやすいよう定数化） ---
  BASE_BACKOFF  = 30.seconds      # 初回待機（30s）
  MAX_BACKOFF   = 30.minutes      # 上限（cap）
  JITTER_RANGE  = 0..10           # ジッター（秒）※混雑回避に軽く分散（jitter: 小さなランダム揺らぎ）

  # 一時的なネットワーク失敗を再試行（必要に応じて調整）
  retry_on Net::OpenTimeout, Net::ReadTimeout, Timeout::Error, SocketError,
           wait: 5.seconds, attempts: 3

  retry_on Geocoder::ServiceUnavailable, wait: 30.seconds, attempts: 5

  # レート制限は指数バックオフ + ジッター（明示的にヘルパーへ委譲）
  retry_on Geocoder::OverQueryLimitError, attempts: 8 do |job, _|
    job.retry_job wait: job.class.backoff_wait(job.executions)
  end

  # 恒久的エラーは破棄（ログは残す）
  discard_on Geocoder::InvalidRequest
  discard_on Geocoder::RequestDenied

  # @param spot_id [Integer]
  # @param expected_lookup [String] enqueue時点の lookup_address（競合対策）
  def perform(spot_id, expected_lookup)
    spot = Spot.find_by(id: spot_id)
    return unless spot

    # 現在の検索文字列（保存後の最新）と、enqueue時に渡された値が一致しない=古いジョブなので中断
    current_lookup = spot.geocode_query
    expected      = expected_lookup.to_s
    return unless current_lookup.to_s.strip.casecmp?(expected.strip)

    # 計測（任意）
    t0 = Process.clock_gettime(Process::CLOCK_MONOTONIC)

    # geocoded_by の設定を使ってジオコーディング（属性にセットするだけ／保存はしない）
    spot.geocode

    api_ms = ((Process.clock_gettime(Process::CLOCK_MONOTONIC) - t0) * 1000).round(1)

    # 値が入っていれば副作用最小で反映（callbacks/validationsを通さない）
    if spot.latitude.present? && spot.longitude.present?
      spot.update_columns(
        latitude:  spot.latitude,
        longitude: spot.longitude,
        updated_at: Time.current
      )
      Rails.logger.info("[perf] geocode_job spot_id=#{spot.id} api_ms=#{api_ms}")
    else
      Rails.logger.warn("[perf] geocode_job spot_id=#{spot.id} not_found api_ms=#{api_ms}")
    end
  end

  class << self
    # クラスメソッド化：テストしやすく、retry_on ブロックからも呼びやすい
    def backoff_wait(executions)
      base   = BASE_BACKOFF * (2 ** (executions - 1))     # 30s, 60s, 120s, 240s, ...
      capped = [base, MAX_BACKOFF].min                    # cap 適用
      jitter = rand(JITTER_RANGE).seconds                 # 0〜10秒の揺らぎ
      capped + jitter
    end

    def backoff_wait_no_jitter(executions)
      base = BASE_BACKOFF * (2 ** (executions - 1))
      [base, MAX_BACKOFF].min
    end
  end
end
