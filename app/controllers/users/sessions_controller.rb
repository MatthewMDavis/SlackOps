class Users::SessionsController < Devise::SessionsController
  after_filter :set_csrf_header, only: [:create, :destroy]

  respond_to :json

  protected

  def set_csrf_header
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end
end
