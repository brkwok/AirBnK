class Api::SpotsController < ApplicationController
  def index
    @spots = params[:bounds] ? Spot.in_bounds(params[:bounds]) : Spot.all

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

  def update

  end

  def delete

  end

  private
  def spot_params
    params.require(:spot).permit(:title, :details, :guests, :cost, :guests, :img_url,
      :bath, :lat, :lng, :beds, :bedroom, :avg_ratings)
  end
end
