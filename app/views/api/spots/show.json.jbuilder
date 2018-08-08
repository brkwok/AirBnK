json.spot do
  json.partial! '/api/spots/spot', spot: @spot
  json.avg_ratings @spot.avg_ratings
end


json.user do
  json.set! @spot.host.id do
    json.partial! '/api/users/user', user: @spot.host
  end
end
