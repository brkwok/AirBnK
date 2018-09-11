class Api::BookingsController < ApplicationController
  def index
    @bookings = Booking.where(user_id: current_user.id)
    @spots = @bookings.map { |booking| booking.spot }
  end

  def create
    @booking = Booking.new(booking_params)
    @booking.user_id = current_user.id

    if @booking.save
      @bookings = Booking.where(user_id: current_user.id)
      @spots = @bookings.map { |booking| booking.spot }
      render :index
    else
      render json: @booking.errors.full_messages, status: 422
    end
  end

  def destroy
    @booking = Booking.find(params[:id])
    if (@booking.user_id == current_user.id)
      @booking.destroy
      render json: ["Booking successfully cancelled"]
    else
      render json: @booking.errors.full_messages, status: 422
    end
  end

  private
  def booking_params
    params.require(:booking).permit(:check_in, :check_out, :user_id, :spot_id)
  end
end
