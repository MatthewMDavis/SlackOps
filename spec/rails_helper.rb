# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
# Prevent database truncation if the environment is production
abort("The Rails environment is running in production mode!") if Rails.env.production?
require 'spec_helper'
require 'rspec/rails'
# Add additional requires below this line. Rails is not loaded until this point!
require 'capybara/rails'
require 'capybara/rspec'
require 'capybara/webkit/matchers'
Capybara.javascript_driver = :webkit
Capybara::Webkit.configure do |config|
  config.allow_url("https://www.facebook.com/impression.php/f1120a1db8/?api_key=1609870452669846&lid=115&payload=%7B%22source%22%3A%22jssdk%22%7D")
  config.allow_url("https://www.facebook.com/")
  config.allow_url("http://connect.facebook.net/en_US/sdk.js")
end

# Pundit testing
require 'support/controllers_helper'
require 'pundit/rspec'

# The following line is provided for convenience purposes. It has the downside
# of increasing the boot-up time by auto-requiring all files in the support
# directory. Alternatively, in the individual `*_spec.rb` files, manually
# require only the support files necessary.
#
Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }

# Checks for pending migrations before tests are run.
# If you are not using ActiveRecord, you can remove this line.
ActiveRecord::Migration.maintain_test_schema!

RSpec.configure do |config|
  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures

  # If you're not using ActiveRecord, or you'd prefer not to run each of your
  # examples within a transaction, remove the following line or assign false
  # instead of true.
  config.use_transactional_fixtures = false
  config.mock_framework = :rspec
  # RSpec Rails can automatically mix in different behaviours to your tests
  # based on their file location, for example enabling you to call `get` and
  # `post` in specs under `spec/controllers`.
  #
  # You can disable this behaviour by removing the line below, and instead
  # explicitly tag your specs with their type, e.g.:
  #
  #     RSpec.describe UsersController, :type => :controller do
  #       # ...
  #     end
  #
  # The different available types are documented in the features, such as in
  # https://relishapp.com/rspec/rspec-rails/docs
  config.infer_spec_type_from_file_location!
  config.include FactoryGirl::Syntax::Methods
  #  config.include Features, :type => :feature
  config.include Devise::TestHelpers, :type => :controller
  config.include ControllerHelpers, :type => :controller
  config.include Features::SessionHelpers, :type => :feature
  config.include Warden::Test::Helpers
  ReactOnRails::TestHelper.configure_rspec_to_compile_assets(config)
  config.before :suite do
    Warden.test_mode!
  end
end
