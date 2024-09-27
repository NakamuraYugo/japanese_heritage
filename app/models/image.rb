class Image < ApplicationRecord
  belongs_to :spot, inverse_of: :images
  mount_uploader :name, ImageUploader

  validates :name, presence: { message: :blank }
end
