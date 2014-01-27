describe "Routes" do
	include Rack::Test::Methods

	def app
		Sinatra::Application
	end

	it "should return tags" do
		get '/tags'
		expect(last_response).to be_ok
	end
end