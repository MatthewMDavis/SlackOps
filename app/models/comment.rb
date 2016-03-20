class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :article

  validates :body, :length => { minimum: 1 }
  def commenter
    self.user.username
  end
end
