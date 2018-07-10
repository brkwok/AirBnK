class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if @user
      log_in(@user)
      render 'api/users/show'
    else
      render json: ["Invalid email/password"], status: 401
    end
  end

  def destroy
    log_out
    render json: {}
  end
end
