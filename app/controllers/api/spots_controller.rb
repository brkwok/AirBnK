class Api::SpotsController < ApplicationController
  def index
    @spots = Spot.all
    render :index
  end

  def show
    @spot = Spot.find(params[:id])
  end

  def update

  end

  def delete

  end

  private
  def spot_params
    params.require(:spot).permit(:title, :details, :guests, :cost, :guests, :img_url, :lat, :lng)
  end
end
