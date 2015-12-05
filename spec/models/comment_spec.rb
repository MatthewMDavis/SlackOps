require 'rails_helper'

RSpec.describe Comment, type: :model do
  describe "with an empty body" do
    it 'is not valid' do
      commenter = FactoryGirl.create(:user)
      article = FactoryGirl.create(:article)
      empty_comment = Comment.new(user_id: commenter, article_id: article, body: '')

      expect(empty_comment).to_not be_valid
    end
  end

end
