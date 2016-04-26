class Users::SessionsController < Devise::SessionsController
  respond_to :json

  after_filter :set_csrf_headers, only: [:create, :destroy]
  after_filter :errors_to_http_header

  def failure
    respond_to do |format|
      format.json do
        resource.devise_json_error_messages!
      end
    end
  end

  def respond_to_on_destroy
    puts "DELETE /resource/sign_out"
    respond_to do |format|
      format.json { return render :json => {:success => true} }
    end
  end

  def is_flashing_format?
    true
  end

  protected

  def set_csrf_headers
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end

  private

  def errors_to_http_header
    return unless request.xhr?
    response.headers['X-ErrorMessages'] = render :json => resource.devise_error_messages!
  end
end
