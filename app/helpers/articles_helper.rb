module ArticlesHelper
  def excerpt(article)
    blurb = ""
    blurb << truncate(article.text, length: 1000, escape: false, separator: '. ')
    sanitize(blurb)
  end
end
