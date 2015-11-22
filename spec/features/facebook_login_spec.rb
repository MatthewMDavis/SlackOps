require 'rails_helper'
OmniAuth.config.test_mode = true
OmniAuth.config.add_mock(:facebook, {:uid => '123456789'})

RSpec.describe 'facebook login proces' do
  pending
end

