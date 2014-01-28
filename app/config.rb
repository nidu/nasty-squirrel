require 'sequel'

set :app_root, File.expand_path("..", File.dirname(__FILE__))

set :public_folder, "#{settings.app_root}/public"

set :app_title, 'Nasty Squirrel'

DB = Sequel.connect "sqlite://#{settings.app_root}/db/#{settings.environment}.sqlite3", case_sensitive_like: false

class AppHelpers
  def self.test
    "test"
  end
end
