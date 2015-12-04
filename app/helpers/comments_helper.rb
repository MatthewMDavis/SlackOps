module CommentsHelper
  def cur_user_owns?(record)
    record.user == current_user
  end
end
