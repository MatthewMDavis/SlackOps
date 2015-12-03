require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  describe "GET #index" do
    it "returns http success" do
      admin = FactoryGirl.create(:user, :admin)
      login(admin.email, admin.password)
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #show" do
    it "returns http success" do
      user = FactoryGirl.create(:user)
      get :show
      expect(response).to have_http_status(:success)
    end
  end

end
