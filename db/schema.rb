# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_09_11_151840) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bookings", force: :cascade do |t|
    t.integer "spot_id", null: false
    t.integer "user_id", null: false
    t.date "check_in", null: false
    t.date "check_out", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["spot_id", "user_id"], name: "index_bookings_on_spot_id_and_user_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.string "comment", null: false
    t.integer "rating", null: false
    t.integer "user_id", null: false
    t.integer "spot_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "spot_id"], name: "index_reviews_on_user_id_and_spot_id"
  end

  create_table "spots", force: :cascade do |t|
    t.string "title", null: false
    t.string "details", null: false
    t.integer "host_id", null: false
    t.float "lat", null: false
    t.float "lng", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "type_of_spot", null: false
    t.string "location", null: false
    t.integer "cost", null: false
    t.integer "guests", null: false
    t.string "img_url", null: false
    t.integer "bedroom", default: 1, null: false
    t.integer "beds", default: 1, null: false
    t.integer "bath", default: 1, null: false
    t.index ["host_id"], name: "index_spots_on_host_id"
    t.index ["title"], name: "index_spots_on_title", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "name", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "img_url", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email", "session_token"], name: "index_users_on_email_and_session_token", unique: true
    t.index ["name"], name: "index_users_on_name"
  end

end
