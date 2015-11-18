require 'rails_helper'

RSpec.feature "Article creation", :type => :feature do
  context "Writer creates new article" do
    before do
      visit '/articles/new'
      fill_in 'Title', :with => 'My article title'
      fill_in 'Text', :with => 'My article text'
    end

    it 'takes the writer to the show page' do
      click_button 'Create Article'

      expect(page).to have_link('Edit this article')
    end

    it 'creates a new article in the database' do
      expect { click_button 'Create Article' }.to change(Article, :count).by(1)
    end
  end
end
