# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

house_pics = []
prof_pics = []
(1..33).each do |n|
  house_pics << 'house' + n.to_s + '.jpg'
end

(1..9).each do |n|
  prof_pics << 'prof_pic' + n.to_s + '.jpg'
end

User.destroy_all

a = User.new
a.email = "demo"
a.password= "123456"
a.name= "demo"
a.photo.attach(io: File.open("#{Rails.root}/app/assets/images/#{prof_pics.sample}"), filename: "profile_pic.jpg")
a.save!



40.times do
  a = User.new
  a.email = Faker::Internet.email
  a.password = "123456"
  a.name = Faker::Name.first_name
  a.photo.attach(io: File.open("#{Rails.root}/app/assets/images/#{prof_pics.sample}"), filename: "profile_pic.jpg")
  a.save!
end

first_user = User.first.id
last_user = User.last.id
Spot.destroy_all
typeof = ['Entire house', 'Private room', 'Entire apartment']

30.times do
  a = Spot.new
  a.lat = Faker::Address.latitude
  a.lng = Faker::Address.longitude
  a.location = Faker::Address.city
  a.type_of_spot = typeof.sample
  a.cost = rand(50..150)
  a.guests = rand(1..8)
  a.host_id = rand(first_user..last_user)
  a.details = Faker::ChuckNorris.fact
  a.title = Faker::Address.city
  a.photo.attach(io: File.open("#{Rails.root}/app/assets/images/#{house_pics.sample}"), filename: "profile_pic.jpg")
  a.save!
end

a = Spot.new
a.lat = 40.757155
a.lng = -73.981687
a.location = Faker::Address.city
a.type_of_spot = typeof.sample
a.cost = rand(50..150)
a.guests = rand(1..8)
a.host_id = rand(first_user..last_user)
a.details = Faker::ChuckNorris.fact
a.title = Faker::Address.city
a.photo.attach(io: File.open("#{Rails.root}/app/assets/images/#{house_pics.sample}"), filename: "profile_pic.jpg")
a.save!

a = Spot.new
a.lat = 40.759990
a.lng = -73.990781
a.location = Faker::Address.city
a.type_of_spot = typeof.sample
a.cost = rand(50..150)
a.guests = rand(1..8)
a.host_id = rand(first_user..last_user)
a.details = Faker::ChuckNorris.fact
a.title = Faker::Address.city
a.photo.attach(io: File.open("#{Rails.root}/app/assets/images/#{house_pics.sample}"), filename: "profile_pic.jpg")
a.save!

a = Spot.new
a.lat = 40.750782
a.lng = -73.996623
a.location = Faker::Address.city
a.type_of_spot = typeof.sample
a.cost = rand(50..150)
a.guests = rand(1..8)
a.host_id = rand(first_user..last_user)
a.details = Faker::ChuckNorris.fact
a.title = Faker::Address.city
a.photo.attach(io: File.open("#{Rails.root}/app/assets/images/#{house_pics.sample}"), filename: "profile_pic.jpg")
a.save!

a = Spot.new
a.lat = 40.745880
a.lng = -73.996211
a.location = Faker::Address.city
a.type_of_spot = typeof.sample
a.cost = rand(50..150)
a.guests = rand(1..8)
a.host_id = rand(first_user..last_user)
a.details = Faker::ChuckNorris.fact
a.title = Faker::Address.city
a.photo.attach(io: File.open("#{Rails.root}/app/assets/images/#{house_pics.sample}"), filename: "profile_pic.jpg")
a.save!

a = Spot.new
a.lat = 40.743250
a.lng = -73.994329
a.location = Faker::Address.city
a.type_of_spot = typeof.sample
a.cost = rand(50..150)
a.guests = rand(1..8)
a.host_id = rand(first_user..last_user)
a.details = Faker::ChuckNorris.fact
a.title = Faker::Address.city
a.photo.attach(io: File.open("#{Rails.root}/app/assets/images/#{house_pics.sample}"), filename: "profile_pic.jpg")
a.save!

a = Spot.new
a.lat = 40.755543
a.lng = -73.980568
a.location = Faker::Address.city
a.type_of_spot = typeof.sample
a.cost = rand(50..150)
a.guests = rand(1..8)
a.host_id = rand(first_user..last_user)
a.details = Faker::ChuckNorris.fact
a.title = Faker::Address.city
a.photo.attach(io: File.open("#{Rails.root}/app/assets/images/#{house_pics.sample}"), filename: "profile_pic.jpg")
a.save!

a = Spot.new
a.lat = 40.758229
a.lng = -73.990480
a.location = Faker::Address.city
a.type_of_spot = typeof.sample
a.cost = rand(50..150)
a.guests = rand(1..8)
a.host_id = rand(first_user..last_user)
a.details = Faker::ChuckNorris.fact
a.title = Faker::Address.city
a.photo.attach(io: File.open("#{Rails.root}/app/assets/images/#{house_pics.sample}"), filename: "profile_pic.jpg")
a.save!

a = Spot.new
a.lat = 40.737070
a.lng = -73.998769
a.location = Faker::Address.city
a.type_of_spot = typeof.sample
a.cost = rand(50..150)
a.guests = rand(1..8)
a.host_id = rand(first_user..last_user)
a.details = Faker::ChuckNorris.fact
a.title = Faker::Address.city
a.photo.attach(io: File.open("#{Rails.root}/app/assets/images/#{house_pics.sample}"), filename: "profile_pic.jpg")
a.save!

a = Spot.new
a.lat = 40.727623
a.lng = -73.989690
a.location = Faker::Address.city
a.type_of_spot = typeof.sample
a.cost = rand(50..150)
a.guests = rand(1..8)
a.host_id = rand(first_user..last_user)
a.details = Faker::ChuckNorris.fact
a.title = Faker::Address.city
a.photo.attach(io: File.open("#{Rails.root}/app/assets/images/#{house_pics.sample}"), filename: "profile_pic.jpg")
a.save!

a = Spot.new
a.lat = 40.719196
a.lng = -73.000607
a.location = Faker::Address.city
a.type_of_spot = typeof.sample
a.cost = rand(50..150)
a.guests = rand(1..8)
a.host_id = rand(first_user..last_user)
a.details = Faker::ChuckNorris.fact
a.title = Faker::Address.city
a.photo.attach(io: File.open("#{Rails.root}/app/assets/images/#{house_pics.sample}"), filename: "profile_pic.jpg")
a.save!


first_spot = Spot.first.id
last_spot = Spot.last.id
Review.destroy_all
200.times do
  Review.create!(comment: Faker::ChuckNorris.fact, spot_id: rand(first_spot..last_spot), user_id: rand(first_user..last_user), rating: rand(3..5))
end
