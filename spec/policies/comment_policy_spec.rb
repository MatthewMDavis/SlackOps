require 'rails_helper'

describe CommentPolicy do
  subject { CommentPolicy }

  let(:plain_user) { FactoryGirl.build_stubbed(:user) }
  let(:bad_user) { FactoryGirl.build_stubbed(:user) }
  let(:good_ed) { FactoryGirl.build_stubbed(:user, :editor) }
  let(:bad_ed) { FactoryGirl.build_stubbed(:user,  :editor) }
  let(:admin) { FactoryGirl.build_stubbed(:user, :admin) }
  let(:article) { FactoryGirl.build_stubbed(:article, :user => good_ed) }
  let(:comment) { FactoryGirl.build_stubbed(:comment, :user => plain_user, :article => article) }

  permissions :destroy? do
    it 'permits access to the person who lef the comment' do
      expect(subject).to permit(plain_user, comment)
    end

    it 'denies access to a different user' do
      expect(subject).not_to permit(bad_user, comment)
    end

    it 'permits access to the author of the article the comment belongs to' do
      expect(subject).to permit(good_ed, comment)
    end

    it 'denies access to other editors' do
      expect(subject).not_to permit(bad_ed, comment)
    end

    it 'permits access to an admin' do
      expect(subject).to permit(admin, comment)
    end
  end
end
