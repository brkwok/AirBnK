class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(user_params)
    @user.img_url = ActionController::Base.helpers.asset_path('prof_pic.png')

    if @user.save
      log_in(@user)
      render 'api/users/show'
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find(id: current_user.id)

    if @user.update(user_params)

      render 'api/users/show'
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :name, :img_url)
  end
end
