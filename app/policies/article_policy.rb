class ArticlePolicy
  attr_reader :current_user, :model

  def initialize(current_user, model)
    @current_user = current_user
    @article = model
  end

  def new?
    @current_user.admin? || @current_user.editor?
  end

  def edit?
    @current_user.owns?(@article)
  end

  def destroy?
    @current_user.owns?(@article)
  end

  def create?
    @current_user.admin? || @current_user.editor?
  end

  def update?
    @current_user.owns?(@article)
  end
end
