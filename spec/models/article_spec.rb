require 'rails_helper'

RSpec.describe Article, type: :model do
  it 'requires a title' do
    empty_titled_article = Article.new(title: "", text: "Some blog text")

    expect(empty_titled_article).not_to be_valid
  end

  it 'requires an article body of at least 5 chars' do
    empty_bodied_article = Article.new(title: "Test title", text: "four")

    expect(empty_bodied_article).not_to be_valid
  end
  context 'with valid body and title' do
    it 'creates a valid article' do
      full_text_article = Article.new(title: "Test title", text: "Over five.")

      expect(full_text_article).to be_valid
    end
  end
  context 'when retrieving records' do
    let! (:early_article) { FactoryGirl.create(:article, created_at: 1.day.ago) }
    let! (:later_article) {  FactoryGirl.create(:article, created_at: 1.hour.ago) }

    it 'returns the articles in reverse chron order' do
      search_results = Article.all

      expect(search_results.to_a).to eq([later_article, early_article])
    end
  end
end
