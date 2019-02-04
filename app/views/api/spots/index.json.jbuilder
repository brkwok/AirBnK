@spots.each do |spot|
  json.set! spot.id do
    json.partial! '/api/spots/spot', spot: spot
    json.avg_ratings spot.avg_ratings
    json.photoUrl url_for(spot.photo)
  end
end
