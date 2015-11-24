class Article < ActiveRecord::Base
  belongs_to :user
  has_many :comments, dependent: :destroy
  default_scope -> { order(created_at: :desc) }
  validates :title, presence: true
  validates :text, presence:true, length: { minimum: 5 }

  def author
    self.user.username
  end
end
