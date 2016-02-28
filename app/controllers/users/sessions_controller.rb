class Users::SessionsController < Devise::SessionsController
  after_filter :set_csrf_header, only: [:new, :create]

  respond_to :json

  protected

  def set_csrf_header
    response.headers['X-CSRF-Token'] = form_authenticity_token
  end

  # def configure_sign_in_params
  #   devise_parameter_sanitizer.for(:account_update) << :session
  # end
end
