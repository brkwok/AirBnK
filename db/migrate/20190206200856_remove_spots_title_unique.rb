class RemoveSpotsTitleUnique < ActiveRecord::Migration[5.2]
  def change
    remove_index :spots, :title
    add_index :spots, :title
  end
end
