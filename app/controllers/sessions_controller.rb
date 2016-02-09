class SessionsController < Devise::SessionsController
  respond_to :json
  after_filter :set_csrf_header, only: [:new, :create]

  protected

  def set_csrf_header
    response.headers['X-CSRF-Token'] = form_authenticity_token
  end
end
