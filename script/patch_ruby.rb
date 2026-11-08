#!/usr/bin/env ruby

# Patch File.exists? for Ruby 3.x compatibility
unless File.respond_to?(:exists?)
  class File
    class << self
      alias_method :exists?, :exist?
    end
  end
end

# Configure I18n for locale support. This file is preloaded through RUBYOPT, so
# it also runs inside `bundle` itself, before the bundle's gems are on the load
# path. Skip quietly there; the rake/jekyll processes will have i18n available.
begin
  require 'i18n'
  I18n.config.available_locales = [:en, :"en-US"]
  I18n.default_locale = :en
rescue LoadError
end

# Return true to indicate success
true