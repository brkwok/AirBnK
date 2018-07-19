class CreateBookings < ActiveRecord::Migration[5.2]
  def change
    create_table :bookings do |t|
      t.integer :spot_id, null: false
      t.integer :user_id, null: false
      t.date :check_in, null: false
      t.date :check_out, null: false
    end

    add_index :bookings, [:spot_id, :user_id]
  end
end
