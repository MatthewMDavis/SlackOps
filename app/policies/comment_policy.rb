class CommentPolicy
  attr_reader :current_user, :comment

  def initialize(current_user, comment)
    @current_user = current_user
    @comment = comment
  end

  def destroy?
    @current_user.owns?(@comment) || @current_user.owns?(@comment.article)
  end
end
