class AddSpotImgUrl < ActiveRecord::Migration[5.2]
  def change
    add_column :spots, :img_url, :string, :null => false
  end
end
