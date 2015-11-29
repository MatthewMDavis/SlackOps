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
end
