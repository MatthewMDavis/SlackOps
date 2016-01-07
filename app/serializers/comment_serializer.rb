class CommentSerializer < ActiveModel::Serializer
  attributes :id, :commenter, :body, :timestamp

  def timestamp
    object.created_at.to_formatted_s(:long_ordinal)
  end
end
