require 'sinatra/config_file'

set :app_root, File.expand_path("../..", File.dirname(__FILE__))

config_file "#{settings.app_root}/server/config/config.yml"

class AppHelpers
  def self.test
    "test"
  end
end