FactoryGirl.define do  factory :comment do
    user nil
article nil
body "MyText"
  end

  factory :user do
    sequence(:email) { |n| "username-#{n}@foobar.com" }
    sequence(:password) { |n| "password#{n}" }
    sequence(:username) { |n| "my_username#{n}" }

    trait :editor do
      role 'editor'
    end

    trait :admin do
      role 'admin'
    end
  end

  factory :article do
    sequence(:title) { |n| "Article #{n}" }
    sequence(:text) { |n| "Body for article #{n}" }
    sequence(:user) { FactoryGirl.create(:user) }
  end
end
