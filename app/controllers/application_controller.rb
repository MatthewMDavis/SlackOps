class ApplicationController < ActionController::Base
  # include Pundit
  before_action :configure_permitted_parameters, if: :devise_controller?

  # rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  protect_from_forgery with: :exception

  rescue_from ActionController::InvalidAuthenticityToken do |exception|
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
    message = 'Rails CSRF token error; please try again'
    render_with_protection(message.to_json, {:status => :unprocessable_entity})
  end

  after_filter :set_csrf_cookie_for_axios

  def set_csrf_cookie_for_axios
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end

  def render_with_protection(object, parameters = {})
    render parameters.merge(content_type: 'application/json', text: ")]}',\n" + object.to_json)
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << :username
    devise_parameter_sanitizer.for(:sign_in) << :username
    devise_parameter_sanitizer.for(:sign_in) << :session
    devise_parameter_sanitizer.for(:account_update) << :username
  end

  def verified_request?
    super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
  end

  private

  def user_not_authorized
    flash[:alert] = "Access denied."
    redirect_to(request.referrer || root_path)
  end
end


