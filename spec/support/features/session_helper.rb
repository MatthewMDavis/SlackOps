module Features
  module SessionHelpers
    def login(email, password)
      visit new_user_session_path
      fill_in("Email", with: email)
      fill_in("Password", with: password)
      click_button("Log in")
    end
  end
end
