class CommentsController < ApplicationController
  def create
    @article = Article.find(params[:article_id])
    @comment = @article.comments.create(comment_params)

    respond_to do |format|
      format.html { redirect_to article_path(@article) }
      format.json { render json: @article.comments }
    end
  end

  def destroy
    @article = Article.find(params[:article_id])
    @comment = @article.comments.find(params[:id])
    @comment.destroy
    redirect_to request.referrer
  end

  def index
    @article = Article.find(params[:article_id])
    @comments = @article.comments

    respond_to do |format|
      format.json { render json: @comments }
    end
  end
  private

  def comment_params
    params.require(:comment).permit([:article_id, :user_id, :body])

  end

end
