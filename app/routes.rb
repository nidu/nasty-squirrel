require 'sinatra'

get '/' do
  send_file File.expand_path('index.html', settings.public_folder)
end

get '/tags' do
  Tag.all(
    :name.like => "#{params[:q]}%",
    :order => [:name.asc],
    :fields => [:id, :name]
  ).to_json
end