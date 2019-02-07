class Api::SpotsController < ApplicationController
  def index
    @spots = params[:bounds] ? Spot.in_bounds(params[:bounds]) : Spot.where(host_id: current_user.id)

    render :index
  end

  def show
    @spot = Spot.includes(
      reviews: [:user]
    ).find(params[:id])
    @reviews = @spot.reviews
    @users = []
    @reviews.each do |review|
      @users << review.user
    end

    render :show
  end

  def create
    @spot = Spot.new(spot_params)
    @spot.host = current_user

    if @spot.save
      @reviews = @spot.reviews
      @users = []
      @reviews.each do |review|
        @users << review.user
      end
      render :show
    else
      render json: @spot.errors.full_messages, status: 422
    end
  end

  def update

  end

  def delete

  end

  private
  def spot_params
    params.require(:spot).permit(:title, :details, :guests, :location, :cost, :type_of_spot,
      :bath, :lat, :lng, :beds, :bedroom, :avg_ratings, :photo)
  end
end
