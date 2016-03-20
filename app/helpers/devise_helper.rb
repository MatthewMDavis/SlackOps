module DeviseHelper
# Devise error message code rejiggered for json usage

  def devise_json_error_messages!
    return "" if resource.errors.empty?

    messages = resource.errors.full_messages.to_json
  end
end
