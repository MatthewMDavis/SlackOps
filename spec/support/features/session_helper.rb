module Features
  module SessionHelpers
    def login(email, password)
      visit new_user_session_path
      fill_in("Email", with: email)
      fill_in("Password", with: password)
      click_button("Log in")
    end

    def signup(email, username, password)
      visit new_user_registration_path
      fill_in("Email", with: email)
      fill_in("Username", with: username)
      fill_in("Password", with: password)
      fill_in("Password confirmation", with: password)
      click_button("Sign up")
    end
  end
end
