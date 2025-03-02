class Spot < ApplicationRecord
  belongs_to :user
  has_many :images, dependent: :destroy, inverse_of: :spot
  accepts_nested_attributes_for :images, allow_destroy: true

  validates :name, presence: {message: :blank}, length: {maximum: 255}
  validates :description, presence: {message: :blank}, length: {maximum: 65_535}

  validate :must_have_image
  validate :images_count_within_limit

  private

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
