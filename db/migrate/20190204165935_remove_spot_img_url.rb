class RemoveSpotImgUrl < ActiveRecord::Migration[5.2]
  def change
    remove_column :spots, :img_url
  end
end
