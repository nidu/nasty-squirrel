get '/' do
  send_file File.expand_path('index.html', settings.public_folder)
end

get '/search' do
  q = params[:query]

end

get '/tags' do
  fields = [:id, :name]
  Tag.all(
    :name.like => "#{params[:query]}%",
    :order => [:name.asc],
    :fields => fields
  ).to_json(only: fields)
end