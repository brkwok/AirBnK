class RemoveRatingsFromSpots < ActiveRecord::Migration[5.2]
  def change
    remove_column :spots, :rating
  end
end
