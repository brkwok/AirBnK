# == Schema Information
#
# Table name: reviews
#
#  id         :bigint(8)        not null, primary key
#  comment    :string           not null
#  rating     :integer          not null
#  user_id    :integer          not null
#  spot_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Review < ApplicationRecord
  validates :spot_id, :user_id, :comment, :rating, presence: true

  belongs_to :user

  belongs_to :spot
end
