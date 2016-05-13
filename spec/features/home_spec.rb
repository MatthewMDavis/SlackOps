require 'rails_helper'

feature 'Home' do
  it 'should not have auth prompt when js is off' do
    visit(root_path)
    expect(page).not_to have_text('Log In')
  end

  it 'should have authentication prompt when js is on', :js => true do
    visit(root_path)
    expect(page).to have_text('Log In')
  end

end
