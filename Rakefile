require 'sinatra/activerecord/rake'
require_relative 'app/app'

desc 'launch app'
task :start do |t|
	ruby 'app/app.rb'
end

desc 'apply fixtures from db/fixtures.rb (set RACK_ENV to specify database)'
task :fixtures => ['db:migrate'] do |t|
	require_relative 'db/fixtures'
end

desc 'launch irb with app context'
task :irb do |t|
	require 'irb'

	ARGV.clear
	IRB.start
end

desc 'test app'
task :test => [:fixtures] do |t|
	sh 'rspec test/server/tests.rb'
end