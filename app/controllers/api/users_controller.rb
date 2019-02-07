class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @reviews = Review.where(user_id: params[:id])
    @spots = @reviews.map { |review| review.spot }
    @bookings = Booking.where(user_id: current_user.id)
  end

  def create
    @user = User.new(user_params)
    @reviews = Review.where(user_id: @user.id)
    @spots = @reviews.map { |review| review.spot }

    if @user.save
      @reviews = Review.where(user_id: params[:id])
      @spots = @reviews.map { |review| review.spot }
      log_in(@user)

      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  # def update
  #   @user = User.find(id: current_user.id)
  #
  #   if @user.update(user_params)
  #
  #     render 'api/users/show'
  #   else
  #     render json: @user.errors.full_messages, status: 422
  #   end
  # end

  private
  def user_params
    params.require(:user).permit(:email, :password, :name, :photo)
  end
end
