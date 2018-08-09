# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
User.create!(id: 0, email: "demo", password: "123456", name: "demo", img_url: ActionController::Base.helpers.asset_path('prof_pic.png'))


Spot.destroy_all
typeof = ['Entire house', 'Private room', 'Entire apartment']
200.times do
  Spot.create!(lat: Faker::Address.latitude, lng: Faker::Address.longitude, location: Faker::Address.city, type_of_spot: typeof.sample, cost: rand(50..150), guests: rand(1..8), host_id: 0, details: Faker::ChuckNorris.fact, title: Faker::Address.city, img_url: ActionController::Base.helpers.asset_path("house#{rand(1..4)}.jpg"))
end

Review.destroy_all
first_spot = Spot.first.id
last_spot = Spot.last.id
1000.times do
  Review.create!(comment: Faker::ChuckNorris.fact, spot_id: rand(first_spot..last_spot), user_id: 0, rating: rand(1..5))
end
