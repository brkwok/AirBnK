# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# prof_pic1 = ActionController::Base.helpers.asset_path('prof_pic.png')
# prof_pic1 = ActionController::Base.helpers.asset_path('prof_pic.png')
# prof_pic1 = ActionController::Base.helpers.asset_path('prof_pic.png')
# prof_pic1 = ActionController::Base.helpers.asset_path('prof_pic.png')
# prof_pic1 = ActionController::Base.helpers.asset_path('prof_pic.png')
# prof_pic1 = ActionController::Base.helpers.asset_path('prof_pic.png')
house_pics = []
prof_pics = []
(1..33).each do |n|
  house_pics << 'house' + n.to_s + '.jpg'
end

(1..9).each do |n|
  prof_pics << 'prof_pic' + n.to_s + '.jpg'
end

User.destroy_all
User.create!(email: "demo", password: "123456", name: "demo", img_url: ActionController::Base.helpers.asset_path(prof_pics.sample))

200.times do
  User.create!(name: Faker::Name.first_name, password: "123456", email: Faker::Internet.email, img_url: ActionController::Base.helpers.asset_path(prof_pics.sample))
end

first_user = User.first.id
last_user = User.last.id
Spot.destroy_all
typeof = ['Entire house', 'Private room', 'Entire apartment']

500.times do
  Spot.create!(lat: Faker::Address.latitude, lng: Faker::Address.longitude, location: Faker::Address.city, type_of_spot: typeof.sample, cost: rand(50..150), guests: rand(1..8), host_id: rand(first_user..last_user), details: Faker::ChuckNorris.fact, title: Faker::Address.city + ("a".."z").to_a.sample, img_url: ActionController::Base.helpers.asset_path(house_pics.sample))
end

first_spot = Spot.first.id
last_spot = Spot.last.id
Review.destroy_all
2000.times do
  Review.create!(comment: Faker::ChuckNorris.fact, spot_id: rand(first_spot..last_spot), user_id: rand(first_user..last_user), rating: rand(1..5))
end
