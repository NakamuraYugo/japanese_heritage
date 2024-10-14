class RemoveSpotImageFromSpots < ActiveRecord::Migration[6.0]
  def change
    remove_column :spots, :spot_image, :string
  end
end
