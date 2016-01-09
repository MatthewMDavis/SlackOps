class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :commenter, :commenter_url, :timestamp

  def timestamp
    object.created_at.to_formatted_s(:long_ordinal)
  end

  def commenter_url
    user_path(object.user)
  end
end
