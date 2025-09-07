class Spot < ApplicationRecord
  belongs_to :user
  has_many :images, dependent: :destroy, inverse_of: :spot
  accepts_nested_attributes_for :images, allow_destroy: true

  validates :name, presence: {message: :blank}, length: {maximum: 255}
  validates :description, presence: {message: :blank}, length: {maximum: 65_535}

  validate :must_have_image
  validate :images_count_within_limit

  geocoded_by :lookup_address

  # 同期の geocode は廃止（遅延・不安定化の原因）
  # after_validation :geocode, if: :should_geocode?

  # 保存成功後に非同期ジョブで geocode（外部APIはUIスレッドから切り離す）
  after_commit :enqueue_geocoding_job, on: %i[create update]

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

  def should_enqueue_geocoding_after_commit?
    if address.present? && previous_changes['address'].present?
      old, new = previous_changes['address']
      !same_text?(old, new)
    elsif address.blank? && previous_changes['name'].present?
      old, new = previous_changes['name']
      !same_text?(old, new)
    else
      false
    end
  end

  def enqueue_geocoding_job
    return unless should_enqueue_geocoding_after_commit?
    # enqueue時点の geocode_query を渡し、ジョブ側で古いジョブを自然に無効化
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
