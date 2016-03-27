class UserSerializer < ActiveModel::Serializer
  attributes :id, :url, :username, :img, :role, :provider, :email

  def url
    user_path(object)
  end

  def img
    object.image || gravatar_for(object, 50)
  end

  # Locates Gravatar image, if any, for a user's login email
  # Gravatar provides a fallback image if none is on file for
  # the email provided
  def gravatar_for(user, size)
    gravatar_id = Digest::MD5::hexdigest(user.email.downcase)
    "http://gravatar.com/avatar/#{gravatar_id}.png?s=#{size}"
  end
end
