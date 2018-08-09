class Api::ReviewsController < ApplicationController
  def index
    @reviews = Review.all
  end

  def create
    @review = Review.new(review_params)
    @review.user_id = current_user.id

    if @review.save
      @spot = @review.spot
      render "api/spots/show", :id => @spot.id
    else
      render json: @review.errors.full_messages, status: 422
    end
  end

  def destroy
    @review = Review.find(params[:id])
    if (@review.user_id == current_user.id)
      @review.destroy
    else
      render json: ["You can only delete your reviews"], status: 422
    end
  end

  private
  def review_params
    params.require(:review).permit(:comment, :rating, :user_id, :spot_id)
  end
end
