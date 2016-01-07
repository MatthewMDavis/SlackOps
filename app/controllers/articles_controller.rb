class ArticlesController < ApplicationController
  before_filter :authenticate_user!, :except => [:index, :show]

  def index
    @articles = Article.all
  end

  def show
    @article = Article.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render json: @article }
    end
    store_location_for(:user, article_path(@article))
  end

  def new
    @article = Article.new
    @article.user_id = current_user.id
    authorize @article
  end

  def edit
    @article = Article.find(params[:id])
    authorize @article
  end

  def create
    @article = current_user.articles.build(article_params)
    authorize @article
    if @article.save
      redirect_to @article
    else
      render 'new'
    end
  end

  def update
    @article = Article.find(params[:id])
    authorize @article
    if @article.update(article_params)
      redirect_to @article
    else
      render 'edit'
    end
  end

  def destroy
    @article = Article.find(params[:id])
    authorize @article
    @article.destroy

    redirect_to articles_path
  end

  private

    def article_params
      params.require(:article).permit(:title, :text, :user_id)
    end
end
