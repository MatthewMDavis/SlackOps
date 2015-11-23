require 'rails_helper'

RSpec.describe 'Users index page', :devise do
  scenario 'Admin user can see own email on users index' do
    user = FactoryGirl.create(:user, :admin)
    login_as(user, :scope => :user)
    visit users_path

    expect(page).to have_content(user.email)
  end
end
