class RemoveDefaultFromUsersName < ActiveRecord::Migration[6.0]
  def change
    change_column_default :users, :name, from: "名無し", to: nil
  end
end
