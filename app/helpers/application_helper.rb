module ApplicationHelper
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
end
