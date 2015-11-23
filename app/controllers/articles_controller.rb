class ArticlesController < ApplicationController
  before_filter :authenticate_user!, :except => [:index, :show]
  
  def index
    @articles = Article.all
  end

  def show
    @article = Article.find(params[:id])
  end

  def new
    @article = Article.new
    authorize @article
  end

  def edit
    @article = Article.find(params[:id])
    authorize @article
  end

  def create
    @article = Article.new(article_params)
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
      params.require(:article).permit(:title, :text)
    end
end
