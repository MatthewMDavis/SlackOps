require 'rails_helper'

feature 'Users index page', :devise do
  user = FactoryGirl.create(:user, :admin)
  login_as(user, :scope => :user)
  visit users_path

  expect(page).to have_content(user.email)
end
