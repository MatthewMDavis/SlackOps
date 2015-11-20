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
        user = FactoryGirl.create(:user, :named)
        login(user.email, user.password)
        expect(page).to have_link('Log out')
      end

      it 'shows the user is logged in' do
        user = FactoryGirl.create(:user, :named)
        login(user.email, user.password)
        expect(page).to have_content("Logged in as #{user.username}")
      end
    end
  end
  context "upon credential submission" do
    scenario "without an email" do
      visit new_user_session_path
      fill_in('Email', with: '')
      fill_in('Password', with: 'f4kep455wd')
      click_button('Log in')

      expect(page).to have_content('Invalid')
    end

    scenario "without a password" do
      visit new_user_session_path
      fill_in('Email', with: 'legitimate@email.com')
      fill_in('Password', with: '')
      click_button('Log in')

      expect(page).to have_content('Invalid')
    end
    scenario "for a user with a username" do
      visit new_user_session_path
      user = FactoryGirl.create(:user, :named)
      fill_in('Email', with: user.email)
      fill_in('Password', with: user.password)
      click_button('Log in')

      expect(page).to have_content("Logged in as #{user.username}")
    end
  end
  context 'new user signup' do
    scenario 'with all information' do
      signup('fake@unreal.com', 'my_fake_name', 'f4k3p455w0rd')

      expect(page).to have_content('my_fake_name')
    end


    scenario "with no password" do
      signup('fake@unreal.com', 'my_fake_name', '')

      expect(page).to have_content("Password can't be blank")
    end

    scenario "with no email" do
      signup('', 'my_fake_name', 'f4kep455wd')

      expect(page).to have_content("Email can't be blank")
    end


  end
end
