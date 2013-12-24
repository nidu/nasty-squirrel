require 'sinatra'
require 'sinatra/reloader' if development?
require_relative 'config'
require_relative 'models'
require_relative 'routes'