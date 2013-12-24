require 'sinatra'
require 'sinatra/reloader' if development?
require_relative 'server/config'
require_relative 'server/models'

get '/' do
  send_file File.expand_path('partials/index.html', settings.public_folder)
end