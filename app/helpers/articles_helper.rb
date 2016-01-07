module ArticlesHelper
  def excerpt(article)
    blurb = ""
    blurb << truncate(article.text, length: 1000, escape: false, separator: '. ')
    sanitize(blurb)
  end

  def json_for(art_comments, options={})
    options[:scope] ||= self
    options[:url_options] ||= url_options
    ActiveModel::ArraySerializer.new(art_comments, each_serializer:CommentSerializer)
  end

end
