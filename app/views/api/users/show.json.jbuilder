json.user do
  json.partial! '/api/users/user', user: @user
end

json.reviews do
  @reviews.each do |review|
    json.set! review.id do
      json.partial! './api/reviews/review', review: review
    end
  end
end

json.spots do
  @spots.each do |spot|
    json.set! spot.id do
      json.partial! './api/spots/spot', spot: spot
    end
  end
end
