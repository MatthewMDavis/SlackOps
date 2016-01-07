class ArticleSerializer < ActiveModel::Serializer
  embed :ids, include: true

  attributes :id, :title, :text
  has_many :comments
end
