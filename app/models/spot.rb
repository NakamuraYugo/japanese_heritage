class Spot < ApplicationRecord
  belongs_to :user
  has_many :images, dependent: :destroy, inverse_of: :spot
  accepts_nested_attributes_for :images, allow_destroy: true

  validates :name, presence: {message: :blank}, length: {maximum: 255}
  validates :description, presence: {message: :blank}, length: {maximum: 65_535}
end
