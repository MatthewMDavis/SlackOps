FactoryGirl.define do
  factory :article do
    sequence(:title) { |n| "Article #{n}" }
    sequence(:text) { |n| "Body for article #{n}" }
  end
end
