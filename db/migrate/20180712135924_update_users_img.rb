class UpdateUsersImg < ActiveRecord::Migration[5.2]
  def change
    change_column :users, :img_url, :string, :null => false
  end
end
