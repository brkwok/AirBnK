# == Schema Information
#
# Table name: bookings
#
#  id        :bigint(8)        not null, primary key
#  spot_id   :integer          not null
#  user_id   :integer          not null
#  check_in  :date             not null
#  check_out :date             not null
#

class Booking < ApplicationRecord
  validates :spot_id, :user_id, :check_in, :check_out, presence: true
  validate :booking_days_validity
  validate :overlapped?

  belongs_to :user

  belongs_to :spot

  def booking_days_validity
    if (self.check_in == self.check_out)
      errors[:base].push("Booking must last more than one day")
    elsif (self.check_in > self.check_out)
      errors[:base].push("Check out cannot come before check in")
    else
      return
    end
  end

  def overlapped?
    unless date_overlap.empty?
      errors[:base].push("Spot not available on selected dates")
    end
  end

  private
  def date_overlap
    Booking.where.not(id: self.id)
      .where(spot_id: spot_id)
      .where.not('check_in > :check_in OR check_out < :check_out', check_in: check_in, check_out: check_out)
  end
end
