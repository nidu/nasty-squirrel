require 'sinatra'
require 'sinatra/contrib'
require 'sinatra/reloader' if development?
require_relative 'config'
require_relative 'helpers'
require_relative 'models'
require_relative 'routes'