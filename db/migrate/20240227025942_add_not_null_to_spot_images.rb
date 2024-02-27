class AddNotNullToSpotImages < ActiveRecord::Migration[6.0]
  def change
    change_column_null :spots, :spot_images, false
  end
end
