require 'sinatra'
require 'sinatra/reloader' if development?
require_relative 'config'
require_relative 'models'

get '/' do
  send_file File.expand_path('index.html', settings.public_folder)
end