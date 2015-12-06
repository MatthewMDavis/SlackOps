require 'rails_helper'

describe UserPolicy do
  subject { UserPolicy }

  let(:plain_user) { FactoryGirl.build_stubbed(:user) }
  let(:editor) { FactoryGirl.build_stubbed :user, :editor }
  let(:admin) { FactoryGirl.build_stubbed :user, :admin }
  actions = [:index?, :update?, :destroy?]
  actions.each do |action|
    permissions(action) do
      it 'denies access to plain users' do
        expect(subject).not_to permit(plain_user)
      end

      it 'denies access to editors' do
        expect(subject).not_to permit(editor)
      end

      it 'allows access to editors' do
        expect(subject).to permit(admin)
      end
    end
  end
end
