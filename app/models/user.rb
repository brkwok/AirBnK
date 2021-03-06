# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  email           :string           not null
#  name            :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  img_url         :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  validates :password_digest, :name, presence: true
  validates :email, :session_token, presence: true, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  # validate :default_prof_pic

  after_initialize :ensure_session_token

  has_many :spots,
  foreign_key: :host_id

  has_many :bookings,
  foreign_key: :user_id

  has_many :reviews

  has_one_attached :photo

  attr_reader :password

  def self.find_by_credentials(email, password)
    @user = User.find_by(email: email)
    @user && @user.is_password?(password) ? @user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    crypted = BCrypt::Password.new(self.password_digest)
    crypted.is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.base64
    self.save
    self.session_token
  end

  # def default_prof_pic
  #   if !self.photo.attached?
  #     self.photo = ActionController::Base.helpers.asset_path('prof_pic1.jpg')
  #     self.img_url = ActionController::Base.helpers.asset_path('prof_pic1.jpg')
  #   end
  # end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.base64
  end

end
