module ApplicationHelper
  # Parses markdown for rendering articles and comments to page
  def markdown(content)
    @markdown ||= Redcarpet::Markdown.new(BlogMarkdownRenderer, {
      autolink: true,
      space_after_headers: true,
      fenced_code_blocks: true,
      underline: true,
      highlight: true,
      footnotes: true,
      tables: true
    })
    @markdown.render(content).html_safe
  end

  # Add form error methods that work with Bootstrap
  def has_error?( model_class, attribute )
    model_class.errors[attribute].size > 0
  end

  def error_for( model_class, attribute, err_class )
    return err_class if has_error?
    nil
  end

  # Check whether a given article or comment belongs to the current user
  def cur_user_owns?(record)
    (record.user == current_user) || current_user.admin?
  end

  # Locates Gravatar image, if any, for a user's login email
  def gravatar_for(user, size)
    gravatar_id = Digest::MD5::hexdigest(user.email.downcase)
    "http://gravatar.com/avatar/#{gravatar_id}.png?s=#{size}"
  end
end
