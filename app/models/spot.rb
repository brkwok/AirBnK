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
#  rating       :float
#  guests       :integer          not null
#

class Spot < ApplicationRecord
  validates :title, :details, :lat, :lng, :type_of_spot, :location, :cost, :guests, :img_url, presence: true

  belongs_to :host,
  foreign_key: :host_id,
  class_name: :User

  def self.in_bounds(bounds)
    lat_range = (bounds[:southWest][:lat].to_f..bounds[:northEast][:lat].to_f)
    lng_range = (bounds[:southWest][:lng].to_f..bounds[:northEast][:lng].to_f)
    north_south_match = Spot.where({lat: lat_range})
    matches = north_south_match.where({lng: lng_range})
    matches
  end
end
