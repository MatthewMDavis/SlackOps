class UsersController < ApplicationController
  before_filter :authenticate_user!
  def index
    @users = User.all
    authorize User
  end

  def show
    @user = User.find(params[:id])
    @articles = @user.articles
    store_location_for(:user, user_path(@user))
  end

  def destroy
    user = User.find(params[:id])
    user.destroy
    redirect_to users_path, :notice => "User deleted"
  end
end
