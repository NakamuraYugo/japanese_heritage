class RemoveSpotImagesFromSpots < ActiveRecord::Migration[6.0]
  def change
    remove_column :spots, :spot_images, :json
  end
end
