module UsersHelper
  def user_json(user, options={})
    options[:scope] ||= self
    options[:url_options] ||= url_options
    UserSerializer.new(user)
  end
end
