module ArticlesHelper
  def excerpt(article)
    blurb = ""
    blurb << truncate(article.text, length: 1000, escape: false, separator: '. ')
    markdown(blurb)
  end



end
