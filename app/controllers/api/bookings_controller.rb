class Api::BookingsController < ApplicationController
  def index
    @bookings = Booking.where(user_id: current_user.id)
  end

  def create
    @booking = Booking.new(booking_params)
    @booking.user_id = current_user.id

    if @booking.save
      @bookings = Booking.where(user_id: current_user.id)
      render :index
    else
      render json: @booking.errors.full_messages, status: 422
    end
  end

  def destroy

  end

  private
  def booking_params
    params.require(:booking).permit(:check_in, :check_out, :user_id, :spot_id)
  end
end
