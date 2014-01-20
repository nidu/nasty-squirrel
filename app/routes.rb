get '/' do
  send_file File.expand_path('index.html', settings.public_folder)
end

get '/search' do
  q = params[:query]

end

get '/tags' do
  q = Tag.select(:id, :title)
    .order(:title)

  q = q.where("title like ?", params[:query] + "%") if params[:query]

  if params[:exclude]
    ids = parse_id_array(params[:exclude])
    q = q.where("id not in (?)", ids) if ids.size > 0
  end

  q.all.to_json
end
