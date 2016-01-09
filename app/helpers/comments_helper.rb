module CommentsHelper
  def cur_user_owns?(record)
    record.user == current_user
  end

  def comments_list_json(art_comments, options={})
    options[:scope] ||= self
    options[:url_options] ||= url_options
    ActiveModel::ArraySerializer.new(art_comments, each_serializer:CommentSerializer)
  end
end
