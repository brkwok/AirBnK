class Spot < ApplicationRecord
  validates :title, :details, :lat, :lng, presence: true

  belongs_to :host,
  foreign_key: :host_id,
  class_name: :User
end
