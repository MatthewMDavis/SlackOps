require 'rails_helper'

RSpec.describe "welcome/index.html.erb", type: :view do
it 'displays welcoming content' do
  render

  expect(rendered).to match(/friendship/)
end
end
