class Spot < ApplicationRecord
  belongs_to :user
  has_many :images, dependent: :destroy, inverse_of: :spot
  accepts_nested_attributes_for :images, allow_destroy: true

  validates :name, presence: {message: :blank}, length: {maximum: 255}
  validates :description, presence: {message: :blank}, length: {maximum: 65_535}

  validate :must_have_image
  validate :images_count_within_limit

  geocoded_by :lookup_address

  after_validation :geocode, if: :should_geocode?


  private

  def lookup_address
    address.presence || name
  end

  def same_text?(old, new)
    old.to_s.strip.downcase == new.to_s.strip.downcase
  end

  def should_geocode?
    if will_save_change_to_address? && address.present?
      old, new = address_before_last_save, address
      return false if same_text?(old, new)
      return true
    end

    if address.blank? && will_save_change_to_name? && name.present?
      old, new = name_before_last_save, name
      return false if same_text?(old, new)
      return true
    end
    false
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
