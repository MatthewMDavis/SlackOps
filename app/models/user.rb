class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :omniauthable
<<<<<<< Updated upstream
=======
  include DeviseTokenAuth::Concerns::User
>>>>>>> Stashed changes
  has_many :articles
  has_many :comments
  enum role: [:user, :editor, :admin]
  after_initialize :set_default_role, :if => :new_record?

  def set_default_role
    self.role ||= :user
  end
<<<<<<< Updated upstream

  def owns?(record)
    self.admin? || record.user == self
  end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      user.username = auth.info.name   # assuming the user model has a name
      user.image = auth.info.image # assuming the user model has an image
    end
  end

=======

  def owns?(record)
    self.admin? || record.user == self
  end

  # STUFF BELOW COMMENTED OUT WHILE EVALUATING TOKEN AUTH
  # # Include default devise modules. Others available are:
  # # :confirmable, :lockable, :timeoutable and :omniauthable
  # devise :database_authenticatable, :registerable,
  #        :recoverable, :rememberable, :trackable, :validatable, :omniauthable, :omniauth_providers => [:facebook]
  # validates :username, presence: true, length: { minimum: 2, maximum: 24 }, uniqueness: true

  # def self.from_omniauth(auth)
  #   where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
  #     user.email = auth.info.email
  #     user.password = Devise.friendly_token[0,20]
  #     user.username = auth.info.name   # assuming the user model has a name
  #     user.image = auth.info.image # assuming the user model has an image
  #   end
  # end

>>>>>>> Stashed changes
end
