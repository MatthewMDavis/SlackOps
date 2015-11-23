class ArticlePolicy
  attr_reader :current_user, :model

  def initialize(current_user, model)
    @current_user = current_user
    @model = model
  end

  def new?
    @current_user.admin? || @current_user.editor?
  end

  def edit?
    @current_user.admin? || @current_user.editor?
  end

  def destroy?
    @current_user.admin? || @current_user.editor?
  end

  def create?
    @current_user.admin? || @current_user.editor?
  end

  def update?
    @current_user.admin? || @current_user.editor?
  end
end
