module CommentsHelper
  def cur_user_owns?(comment)
    comment.user == current_user
  end
end
