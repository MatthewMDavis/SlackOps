class Users::SessionsController < Devise::SessionsController
  skip_before_filter :verify_signed_out_user

  respond_to :json

  def create
    resource = warden.authenticate!(auth_options)
    sign_in(resource_name, resource)
    yield resource if block_given?
    if request.format.json?
      render json: resource
    else
      respond_with resource, location: after_sign_in_path_for(resource)
    end
  end

  # DELETE /users/logout
  def destroy
    puts "DELETE /users/logout"

    return render :json => {:user => false}
  end

  def failure
    return render :json => {:success => false, :errors => ["Login failed."]}
  end
end
