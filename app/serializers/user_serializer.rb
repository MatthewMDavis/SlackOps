class UserSerializer < ActiveModel::Serializer
  attributes :id, :url, :username

  def url
    user_path(object)
  end
end
