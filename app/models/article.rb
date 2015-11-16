class Article < ActiveRecord::Base
  default_scope -> { order(created_at: :desc) }
  validates :title, presence: true
  validates :text, presence:true, length: { minimum: 5 }
end
