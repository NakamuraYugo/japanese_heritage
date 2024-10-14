class ChangeSpotsColumnsNotNull < ActiveRecord::Migration[6.0]
  def change
    change_column_null :spots, :name, false
    change_column_null :spots, :description, false
    change_column_null :spots, :spot_image, false
  end
end
