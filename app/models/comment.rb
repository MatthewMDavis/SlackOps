class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :article

  def commenter
    self.user.username
  end
end
