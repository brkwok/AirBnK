@spots.each do |spot|
  json.set! spot.id do
    json.extract! spot, :title, :type_of_spot, :location, :cost, :rating, :lat, :lng, :details, :host_id, :guests, :img_url
  end
end