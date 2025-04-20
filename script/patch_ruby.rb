#!/usr/bin/env ruby

# Patch File.exists? for Ruby 3.x compatibility
unless File.respond_to?(:exists?)
  class File
    class << self
      alias_method :exists?, :exist?
    end
  end
end

# Configure I18n for locale support
require 'i18n'
I18n.config.available_locales = [:en, :"en-US"]
I18n.default_locale = :en

# Return true to indicate success
true