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

  describe "with html in the body" do
    it "strips out non-whitelisted tag" do
      commenter = FactoryGirl.create(:user)
      article = FactoryGirl.create(:article)
      html_comment = Comment.new(user_id: commenter, article_id: article, body: '<script>code</script>')

      html_comment.save
      expect(html_comment.body).to eq('code')
    end
  end
end
