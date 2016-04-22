require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Rgblog
  class Application < Rails::Application

    config.active_record.raise_in_transactional_callbacks = true
    config.action_view.field_error_proc = Proc.new { |html_tag, instance| html_tag }
  end
end
