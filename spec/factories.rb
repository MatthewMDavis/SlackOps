FactoryGirl.define do
  factory :user do
    sequence(:email) { |n| "username-#{n}@foobar.com" }
    sequence(:password) { |n| "password#{n}" }

    trait :named do
      sequence(:username) { |n| "my_username#{n}" }
    end
  end

  factory :article do
    sequence(:title) { |n| "Article #{n}" }
    sequence(:text) { |n| "Body for article #{n}" }
  end
end