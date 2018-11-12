class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @reviews = Review.where(user_id: params[:id])
    @spots = @reviews.map { |review| review.spot }
  end

  def create
    @user = User.new(user_params)
    @user.img_url = ActionController::Base.helpers.asset_path('prof_pic1.jpg')

    if @user.save
      @reviews = Review.where(user_id: params[:id])
      @spots = @reviews.map { |review| review.spot }
      log_in(@user)
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
    params.require(:user).permit(:email, :password, :name, :img_url)
  end
end
