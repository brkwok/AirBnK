class UpdateSpots < ActiveRecord::Migration[5.2]
  def change
    add_column :spots, :type, :string, :null => false
    add_column :spots, :location, :string, :null => false
    add_column :spots, :cost, :integer, :null => false
    add_column :spots, :rating, :float
    add_column :spots, :guests, :integer, :null => false

    add_index :spots, :title, unique: true
    add_index :spots, :host_id
  end
end
