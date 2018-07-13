class UpdateSpotTypes < ActiveRecord::Migration[5.2]
  def change
    rename_column :spots, :type, :type_of_spot
  end
end
