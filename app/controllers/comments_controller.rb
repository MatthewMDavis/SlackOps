class CommentsController < ApplicationController
  def create
    @article = Article.find(params[:article_id])
    @comment = @article.comments.build(comment_params)

    respond_to do |format|
      # format.html { redirect_to article_path(@article) }
      format.json do
        if @comment.save
          render json: @article.comments
        else
          render json: { message: "Validation failed", errors: @comment.errors }, status: 400
        end
      end
    end
  end

  def destroy
    @article = Article.find(params[:article_id])
    @comment = @article.comments.find(params[:id])
    @comment.destroy
    respond_to do
      format.json { render json: @comments }
      format.html { redirect_to request.referrer }
    end
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
