# == Schema Information
#
# Table name: spots
#
#  id           :bigint(8)        not null, primary key
#  title        :string           not null
#  details      :string           not null
#  host_id      :integer          not null
#  lat          :float            not null
#  lng          :float            not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  type_of_spot :string           not null
#  location     :string           not null
#  cost         :integer          not null
#  guests       :integer          not null
#  img_url      :string           not null
#  bedroom      :integer          default(1), not null
#  beds         :integer          default(1), not null
#  bath         :integer          default(1), not null
#

class Spot < ApplicationRecord
  validates :title, :details, :lat, :lng, :type_of_spot, :location, :cost, :guests,
    :bedroom, :beds, :bath, presence: true

  belongs_to :host,
  foreign_key: :host_id,
  class_name: :User

  has_many :bookings,
  foreign_key: :spot_id,
  class_name: :Booking

  has_many :reviews

  has_one_attached :photo

  def avg_ratings
    if !self.reviews.empty?
      ratings = self.reviews.map { |el| el.rating }
      sum_ratings = ratings.reduce(:+)
      float = sum_ratings / (ratings.length.to_f)
      return (float * 10).ceil / 10.0
    else
      return nil
    end
  end

  def self.in_bounds(bounds)
    
    lat_range = (bounds[:southWest][:lat].to_f..bounds[:northEast][:lat].to_f)
    lng_range = (bounds[:southWest][:lng].to_f..bounds[:northEast][:lng].to_f)
    north_south_match = Spot.where({lat: lat_range})
    matches = north_south_match.where({lng: lng_range})
    matches
  end
end
