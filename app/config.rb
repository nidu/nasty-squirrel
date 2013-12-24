require 'sinatra/config_file'

set :app_root, File.expand_path("..", File.dirname(__FILE__))

set :public_folder, "#{settings.app_root}/public"

config_file "#{settings.app_root}/config/config.yml"

class AppHelpers
  def self.test
    "test"
  end
end