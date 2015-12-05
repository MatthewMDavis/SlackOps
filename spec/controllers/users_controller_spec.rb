require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  describe "GET #index" do
    it "returns http failure with user authorization" do
      user = FactoryGirl.create(:user)
      stub_sign_in(user)
      get :index

      expect(response).to_not be_success
    end
    it "returns http success with admin authorization" do
      admin = FactoryGirl.create(:user, :admin)
      stub_sign_in(admin)
      get :index

      expect(response).to be_success
    end
  end

  describe "GET #show" do
    it "returns http success" do
      user = FactoryGirl.create(:user)
      stub_sign_in
      get :show, id: user.id

      expect(response).to be_success
    end
  end

end
