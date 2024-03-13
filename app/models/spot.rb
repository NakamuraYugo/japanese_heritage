class Spot < ApplicationRecord
  belongs_to :user

  mount_uploaders :spot_images, SpotImageUploader

  validates :name, presence: true, length: {maximum: 255}
  validates :description, presence: true, length: {maximum: 65_535}
  validates :spot_images, presence: true

end
