class SpotGeocodeJob < ApplicationJob
  queue_as :default

  # 一時的なネットワーク失敗を再試行（必要に応じて調整）
  retry_on Net::OpenTimeout, Net::ReadTimeout, Timeout::Error, SocketError,
           wait: 5.seconds, attempts: 3

  # @param spot_id [Integer]
  # @param expected_lookup [String] enqueue時点の lookup_address（競合対策）
  def perform(spot_id, expected_lookup)
    spot = Spot.find_by(id: spot_id)
    return unless spot

    # 現在の検索文字列（保存後の最新）と、enqueue時に渡された値が一致しない=古いジョブなので中断
    current_lookup = spot.send(:lookup_address).to_s
    return unless same_text?(current_lookup, expected_lookup)

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

  private

  # 前後空白/大小文字違いを無視した同値判定（normalization(正規化)）
  def same_text?(a, b)
    a.to_s.strip.downcase == b.to_s.strip.downcase
  end
end
