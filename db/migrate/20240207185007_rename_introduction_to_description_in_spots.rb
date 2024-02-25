class RenameIntroductionToDescriptionInSpots < ActiveRecord::Migration[6.0]
  def change
    rename_column :spots, :introduction, :description
  end
end
