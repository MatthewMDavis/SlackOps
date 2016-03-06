class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

    def facebook
      @user = User.from_omniauth(request.env["omniauth.auth"])

      if @user.persisted?
        respond_to do |format|
          format.json { return render :json => @user }
          format.html do
            sign_in_and_redirect @user, :event => :authentication #this will throw if @user is not activated
            set_flash_message(:notice, :success, :kind => "Facebook") if is_navigational_format?
          end
        end
      else

        session["devise.facebook_data"] = request.env["omniauth.auth"]
        redirect_to new_user_registration_url
      end

    end
end
