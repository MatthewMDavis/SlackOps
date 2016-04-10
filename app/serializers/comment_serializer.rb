class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :commenter, :commenter_url, :timestamp, :display_date

  def timestamp
    object.created_at.to_formatted_s(:iso8601)
  end

  def display_date
    object.created_at.to_formatted_s(:long_ordinal)
  end

  def commenter_url
    user_path(object.user)
  end
end
