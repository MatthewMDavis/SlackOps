require 'rails_helper'

describe ArticlePolicy do
  subject { ArticlePolicy }

  let(:plain_user) { FactoryGirl.build_stubbed(:user) }
  let(:good_ed) { FactoryGirl.build_stubbed(:user, :editor) }
  let(:bad_ed) { FactoryGirl.build_stubbed(:user,  :editor) }
  let(:admin) { FactoryGirl.build_stubbed(:user, :admin) }
  let(:article) { FactoryGirl.build_stubbed(:article, :user => good_ed) }

  existing_art_actions = [:edit?, :update?, :destroy?]
  existing_art_actions.each do |action|
    permissions(action) do
      it 'denies access to plain users' do
        expect(subject).not_to permit(plain_user, article)
      end

      it 'permits access to an editor owning the article' do
        expect(subject).to permit(good_ed, article)
      end

      it 'denies access to a non-owning editor' do
        expect(subject).not_to permit(bad_ed, article)
      end

      it 'permits access to an admin' do
        expect(subject).to permit(admin, article)
      end
    end
  end

  new_art_actions = [:new?, :create?]
  new_art_actions.each do |action|
    permissions(action) do
      it 'denies access to plain users' do
        expect(subject).not_to permit(plain_user)
      end

      it 'permits access to any editor' do
        expect(subject).to permit(bad_ed)
      end

      it 'permits access to an admin' do
        expect(subject).to permit(admin)
      end
    end
  end
end
