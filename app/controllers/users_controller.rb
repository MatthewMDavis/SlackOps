class UsersController < ApplicationController
  before_filter :authenticate_user!
  def index
    @users = User.all
    authorize User
  end

  def show
    @user = User.find(params[:id])
    @articles = @user.articles
    @comments = @user.comments
    store_location_for(:user, user_path(@user))
  end

  def destroy
    user = User.find(params[:id])
    user.destroy
    redirect_to users_path, :notice => 'User deleted'
  end

  def update
    @user = User.find(params[:id])
    authorize @user

    if @user.update_attributes(secure_role_params)
      redirect_to users_path, :success => 'User role updated.'
    else
      redirect_to users_path, :alert => 'Unable to update user'
    end
  end

  private

  def secure_role_params
    params.require(:user).permit(:role)
  end
end
