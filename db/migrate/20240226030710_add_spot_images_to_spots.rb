class AddSpotImagesToSpots < ActiveRecord::Migration[6.0]
  def change
    add_column :spots, :spot_images, :json
  end
end
