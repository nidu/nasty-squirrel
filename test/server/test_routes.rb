require 'rack/test'

describe "Routes" do
	include Rack::Test::Methods

	def app
		Sinatra::Application
	end

	it "should return tags for query and exclude" do
		get '/tags'
		expect(last_response).to be_ok

    data = JSON.parse last_response.body

    # test exclude
    some_ids = [data[0]['id'], data[-1]['id']]
    get '/tags?exclude=' + some_ids.join(',')
    data_with_exclude = JSON.parse last_response.body
    expect(data_with_exclude.size).to be(data.size - 2)

    # test query
    first_id = data[0]['id']
    query = data[0]['title'][0]
    get '/tags?query=' + query
    data_with_query = JSON.parse last_response.body
    data_with_query_ids = data_with_query.map { |t| t['id'] }
    expect(data_with_query_ids).to include(first_id)
    expect(data_with_query.size).to be < data.size
	end
end