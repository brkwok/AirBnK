json.user do
  json.partial! '/api/users/user', user: @user
  json.photoUrl url_for(@user.photo)
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
      json.photoUrl url_for(spot.photo)
    end
  end
end

json.bookings do
  @bookings.each do |booking|
    json.set! booking.id do
      json.partial! './api/bookings/booking', booking: booking
    end
  end
end
