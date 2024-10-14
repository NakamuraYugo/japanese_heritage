class CreateImages < ActiveRecord::Migration[6.0]
  def change
    create_table :images do |t|
      t.references :spot, null: false, foreign_key: true
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
