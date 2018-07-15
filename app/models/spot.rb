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
    self.where("lat < ?", bounds[:northEast][:lat])
      .where("lat > ?", bounds[:southWest][:lat])
      .where("lng < ?", bounds[:northEast][:lng])
      .where("lng > ?", bounds[:southWest][:lng])
  end
end
