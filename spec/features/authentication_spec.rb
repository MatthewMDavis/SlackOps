require 'rails_helper'
RSpec.feature describe "devise authentication", :devise do
  context "on the blog articles main page" do
    before(:each) { visit root_path }
    context "without authentication" do

      it 'has a login link' do
        expect(page).to have_link('Log In')
      end

      it 'has a signup link' do
        expect(page).to have_link('Sign Up')
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
        expect(page).to have_content("Logged in as #{user.username}")
      end
    end
  end
  context "upon credential submission" do
    scenario "login fails without an email" do
      visit new_user_session_path
      fill_in('Email', with: '')
      fill_in('Password', with: 'f4kep455wd')
      click_button('Log in')

      expect(page).to have_content('Invalid')
    end

    scenario "login fails without a password" do
      visit new_user_session_path
      fill_in('Email', with: 'legitimate@email.com')
      fill_in('Password', with: '')
      click_button('Log in')

      expect(page).to have_content('Invalid')
    end
    scenario "login succeeds without a username" do
      visit new_user_session_path
      user = FactoryGirl.create(:user)
      fill_in('Email', with: user.email)
      fill_in('Password', with: user.password)
      click_button('Log in')

      expect(page).to have_content("Logged in as #{user.username}")
    end
  end
  context 'new user signup' do
    scenario 'login succeeds with all information' do
      signup('fake@unreal.com', 'my_fake_name', 'f4k3p455w0rd')

      expect(page).to have_content('my_fake_name')
    end


    scenario "login fails with no password" do
      signup('fake@unreal.com', 'my_fake_name', '')

      expect(page).to have_content("Password can't be blank")
    end

    scenario "login fails with no email" do
      signup('', 'my_fake_name', 'f4kep455wd')

      expect(page).to have_content("Email can't be blank")
    end


  end

  context "when viewing comments" do
      let(:article) {   FactoryGirl.create(:article) }
      let(:user1) { FactoryGirl.create(:user) }

    scenario "A user has a delete link for her comments" do
      Comment.create(user_id: user1.id, article_id: article.id, body: "test content")
      login_as(user1)
      visit article_path(article)

      expect(page).to have_content("Delete comment")
    end

    scenario "A user's delete link removes the comment from the database" do
      Comment.create(user_id: user1.id, article_id: article.id, body: "test content")
      login_as(user1)
      visit article_path(article)

      expect { click_link 'Delete comment' }.to change(Comment, :count).by(-1)
    end

    scenario "A user has no delete link for other user comments" do
      Comment.create(user_id: user1.id, article_id: article.id, body: "test content")
      user2 = FactoryGirl.create(:user)
      login_as(user2)
      visit article_path(article)

      expect(page).to_not have_content("Delete comment")
    end

    scenario "An admin user has a delete link for user comments" do
      Comment.create(user_id: user1.id, article_id: article.id, body: "test content")
      admin = FactoryGirl.create(:user, :admin)
      login_as(admin)
      visit article_path(article)

      expect(page).to have_content("Delete comment")
    end

    scenario "An editor has a delete link for comments on her article" do
      editor = FactoryGirl.create(:user, :editor)
      new_article = Article.create(user_id: editor.id, title: "A title", text: "some text")
      Comment.create(user_id: user1.id, article_id: new_article.id, body: "test content")

      login_as(editor)
      visit article_path(new_article)

      expect(page).to have_link("Delete comment")
    end
  end

  context "from an article page" do
    scenario "Devise login returns to article page" do
      article = FactoryGirl.create(:article)
      user = FactoryGirl.create(:user)
      visit article_path(article)
      login(user.email, user.password)

      expect(page).to have_content(article.text)
      expect(page).to have_link('< Back to Blog Index')
    end
  end

  context "from another user page" do
    scenario "Devise login returns to user page" do
      user1 = FactoryGirl.create(:user)
      user2 = FactoryGirl.create(:user)
      visit user_path(user1)
      login(user2.email, user2.password)

      expect(page).to have_content(user1.username)
      expect(page).to have_content("Email: #{user1.email}")
    end
  end
end
