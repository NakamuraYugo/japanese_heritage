class CreateSpots < ActiveRecord::Migration[6.0]
  def change
    create_table :spots do |t|
      t.string :name
      t.text :introduction
      t.string :spot_image

      t.timestamps
    end
  end
end
