require 'rails_helper'

RSpec.feature describe "devise authentication", :devise do
  context "on the blog articles main page" do
    before(:each) { visit root_path }
    context "without authentication" do

      it 'has a login link' do
        expect(page).to have_link('Log in')
      end

      it 'has a signup link' do
        expect(page).to have_link('Sign up')
      end
    end

      context "with authentication" do
        it 'has a logout link' do
          user = FactoryGirl.create(:user)
          login(user.email, user.password)
          expect(page).to have_link('Log out')
        end

        it 'shows the user is logged in' do
          user = FactoryGirl.create(:user)
          login(user.email, user.password)
          expect(page).to have_content("Logged in as #{user.email}")
        end
      end
  end
end
