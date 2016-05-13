class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

  def facebook
    @user = User.from_omniauth(request.env["omniauth.auth"])

    if @user.persisted?
      respond_to do |format|
        format.json do
          sign_in @user
          return render :json => @user
        end

        format.html do
          sign_in_and_redirect @user, :event => :authentication #this will throw if @user is not activated
          set_flash_message(:notice, :success, :kind => "Facebook") if is_navigational_format?
        end
      end

    else
      respond_to do |format|
        format.json do
          render json: { errors: @user.errors }, status: 400
        end
        format.html do
          session["devise.facebook_data"] = request.env["omniauth.auth"]
          redirect_to new_user_registration_url
        end
      end
    end

  end
end
