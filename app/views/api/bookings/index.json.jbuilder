@bookings.each do |booking|
  json.set! 'bookings' do
    json.set! booking.id do
      json.partial! '/api/bookings/booking', booking: booking
    end
  end
end

@spots.each do |spot|
  json.set! 'spots' do
    json.set! spot.id do
      json.partial! '/api/spots/spot', spot: spot
    end
  end
end
