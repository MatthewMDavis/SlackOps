class Users::SessionsController < Devise::SessionsController
  respond_to :json

  after_filter :set_csrf_headers, only: [:create, :destroy]

  def respond_to_on_destroy
    puts "DELETE /resource/sign_out"
    respond_to do |format|
      format.json { return render :json => {:success => true} }
    end
  end
  protected

  def set_csrf_headers
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end


end
