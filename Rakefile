require_relative 'app/app'
require 'rspec/core/rake_task'
require 'rack/test'
require 'rspec'

desc 'launch app'
task :start do |t|
	ruby 'app/app.rb'
end

task :migrate do |t|
  sh "sequel -m db/migrate sqlite://db/#{settings.environment}.sqlite3"
end

desc 'apply fixtures from db/fixtures.rb (set RACK_ENV to specify database)'
task :fixtures => [:migrate] do |t|
	require_relative 'db/fixtures'
  Fixtures.clear
  Fixtures.apply
end

desc 'apply fixtures from db/fixtures.rb (set RACK_ENV to specify database)'
task :fixtures_private => [:migrate] do |t|
	require_relative 'db/private_fixtures'
  PrivateFixtures.clear
  PrivateFixtures.apply
end

desc 'launch irb with app context'
task :irb do |t|
	require 'irb'

	ARGV.clear
	IRB.start
end

RSpec::Core::RakeTask.new(:test) do |t|
  t.pattern = Dir['test/server/test_*.rb'].sort
  t.rspec_opts = "-r ./app/app"
end