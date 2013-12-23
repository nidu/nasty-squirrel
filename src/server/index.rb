require 'sinatra'
require 'sinatra/reloader' if development?
require_relative 'config'
require_relative 'models'

get '/' do
  "#{settings.app_title} is doing it\'s dirty web magic right now..."
end