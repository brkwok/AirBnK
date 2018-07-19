class AddSpotDetails < ActiveRecord::Migration[5.2]
  def change
    add_column :spots, :bedroom, :integer, default: 1, null: false
    add_column :spots, :beds, :integer, default: 1, null: false
    add_column :spots, :bath, :integer, default: 1, null: false
  end
end
