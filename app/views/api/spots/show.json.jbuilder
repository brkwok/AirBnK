json.spot do
  json.partial! '/api/spots/spot', spot: @spot
  json.avg_ratings @spot.avg_ratings
end


json.user do
  json.set! @spot.host.id do
    json.partial! '/api/users/user', user: @spot.host
    json.photoUrl url_for(@spot.host.photo)
  end
end

json.users do
  @users.each do |user|
    json.set! user.id do
      json.partial! '/api/users/user', user: user
      json.photoUrl url_for(user.photo)
    end
  end
end

json.reviews do
  if @spot.reviews
    @spot.reviews.each do |review|
      json.set! review.id do
        json.extract! review,:id, :comment, :user_id, :spot_id, :rating, :created_at
      end
    end
  end
end
