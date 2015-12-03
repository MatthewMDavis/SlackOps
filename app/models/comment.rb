class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :article

  validates :body, :presence => true
  def commenter
    self.user.username
  end
end
