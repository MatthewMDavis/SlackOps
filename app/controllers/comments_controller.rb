class CommentsController < ApplicationController
  def create
    @article = Article.find(params[:article_id])
    @comment = @article.comments.create(comment_params)
    redirect_to article_path(@article)
  end

  private

  def comment_params
    params.require(:comment).permit([:article_id, :user_id, :body])

  end

end
