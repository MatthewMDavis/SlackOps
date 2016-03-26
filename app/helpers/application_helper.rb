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

  def bootstrap_class_for flash_type
    { success: "alert-success", error: "alert-danger", alert: "alert-warning", notice: "alert-info" }[flash_type] || flash_type.to_s
  end

  def flash_messages(opts = {})
    flash.each do |msg_type, message|
      concat(content_tag(:div, message, class: "alert #{bootstrap_class_for(msg_type)} fade in") do
        concat content_tag(:button, 'x', class: "close", data: { dismiss: 'alert' })
        concat message
      end)
    end
    nil
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

end
