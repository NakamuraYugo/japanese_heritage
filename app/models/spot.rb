class Spot < ApplicationRecord
  belongs_to :user
  has_many :images, dependent: :destroy
  accepts_nested_attributes_for :images, allow_destroy: true

  validates :name, presence: true, length: {maximum: 255}
  validates :description, presence: true, length: {maximum: 65_535}
end
