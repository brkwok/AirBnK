json.user do
<<<<<<< HEAD
  
=======
>>>>>>> c0d9fcf0d3d040df16273015986a40cc98129b5f
  json.partial! '/api/users/user', user: @user
end

json.reviews do
<<<<<<< HEAD
  
=======
>>>>>>> c0d9fcf0d3d040df16273015986a40cc98129b5f
  @reviews.each do |review|
    json.set! review.id do
      json.partial! './api/reviews/review', review: review
    end
  end
end

json.spots do
<<<<<<< HEAD
  
=======
>>>>>>> c0d9fcf0d3d040df16273015986a40cc98129b5f
  @spots.each do |spot|
    json.set! spot.id do
      json.partial! './api/spots/spot', spot: spot
    end
  end
end
