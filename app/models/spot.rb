class Spot < ApplicationRecord
  belongs_to :user
  has_many :images, dependent: :destroy, inverse_of: :spot
  accepts_nested_attributes_for :images, allow_destroy: true

  validates :name, presence: {message: :blank}, length: {maximum: 255}
  validates :description, presence: {message: :blank}, length: {maximum: 65_535}

  validate :must_have_image
  validate :images_count_within_limit

  geocoded_by :lookup_address

  # 保存成功後のみ、必要なときだけジョブenqueue（宣言的に if: を付与）
  after_commit :enqueue_geocoding_job, on: %i[create update],
                if: :should_enqueue_geocoding_after_commit?

  def geocode_query
    lookup_address.to_s
  end

  private

  def lookup_address
    address.presence || name
  end

  def same_text?(a, b)
    a.to_s.strip.casecmp?(b.to_s.strip)
  end

  # === 今回の保存で geocoding を行うべきか？ ===
  def should_enqueue_geocoding_after_commit?
    address_changed_significantly? || name_changed_significantly?
  end

  # 住所が“実質的に”変わった？（住所があればこちらを優先）
  def address_changed_significantly?
    return false unless address.present? && saved_change_to_address?
    old, new = saved_change_to_address
    !same_text?(old, new)
  end

  # 住所が空のときだけ、名称の“実質的な”変更をトリガにする
  def name_changed_significantly?
    return false unless address.blank? && saved_change_to_name?
    old, new = saved_change_to_name
    !same_text?(old, new)
  end

  # enqueue は if 条件を満たす時だけ呼ばれる
  def enqueue_geocoding_job
    SpotGeocodeJob.perform_later(id, geocode_query)
  end

  def must_have_image
    # 「_destroyフラグが付いていない画像が0枚ならエラー」
    if images.reject(&:marked_for_destruction?).empty?
      errors.add(:images, :blank)
    end
  end

  def images_count_within_limit
    # 同じく _destroy=false の画像が10枚を超えたらエラー
    valid_images = images.reject(&:marked_for_destruction?)
    if valid_images.size > 10
      errors.add(:images, :too_many)
    end
  end
end
