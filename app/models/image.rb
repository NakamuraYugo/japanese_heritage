class Image < ApplicationRecord
  belongs_to :spot
  mount_uploader :name, ImageUploader
end
