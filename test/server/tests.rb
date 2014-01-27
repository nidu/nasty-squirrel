ENV['RACK_ENV'] = 'test'

require_relative '../../app/app'
require 'rspec'
require 'rack/test'
require_relative 'test_routes'