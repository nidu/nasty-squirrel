require 'sinatra/json'
require 'json'

get '/' do
  send_file File.expand_path('index.html', settings.public_folder)
end

get '/tags' do
  q = DB[:tags].select(:id, :title).order(:title)
  q = q.where("title like ?", params[:query] + "%") if params[:query]

  if params[:exclude]
    ids = parse_id_array params[:exclude]
    q = q.where("id not in ?", ids) if ids.size > 0
  end

  q.all.to_json
end

post '/tags' do
  data = JSON.parse request.body.read
  ids = data.collect do |t|
    DB[:tags].insert(title: data['title'], description: data['description'])
  end
  ids.to_json
end

get '/product-versions' do
  q = DB[:product_versions].select(:id, :version).order(:version)

  q = q.where("product_id = ?", params[:product_id]) if params[:product_id]

  q.all.to_json
end

get '/products' do
  q = DB[:products].select(:id, :title).order(:title)

  q = q.where("title like ?", params[:query] + "%") if params[:query]

  q.all.to_json
end

get '/articles/:id' do
  article_id = params[:id]

  article = DB[:articles][id: article_id]

  article[:tags] = DB[:tags].select(:id, :title).order(:title)
    .join(:articles_tags, tag_id: :id).where(article_id: article_id).all

  article[:relatedArticles] = DB[:articles].select(:id, :title).order(:title)
    .join(:related_articles, target_article_id: :id).where(source_article_id: article_id).all

  article[:attachments] = DB[:attachments].select{[id, file_name.as(fileName), size, mime_type.as(mimeType)]}.order(:file_name)
    .join(:articles_attachments, attachment_id: :id).where(article_id: article_id).all

  article[:productVersionRanges] = DB["""
    select
      range.id as range_id,
      p.id as product_id, p.title as product_title,
      spv.id as spv_id, spv.version as spv_version,
      epv.id as epv_id, epv.version as epv_version
    from articles_product_version_ranges range
    join product_versions spv
    on range.start_product_version_id = spv.id
    join product_versions epv
    on range.end_product_version_id = epv.id
    join products p
    on spv.product_id = p.id
    where range.article_id = ?
    order by p.title, spv.version, epv.version
  """, article_id].map do |r|
    puts r.to_s
    {
      id: r[:range_id],
      product: {
        id: r[:product_id],
        title: r[:product_title]
      },
      startProductVersion: {
        id: r[:spv_id],
        version: r[:spv_version]
      },
      endProductVersion: {
        id: r[:epv_id],
        version: r[:epv_version]
      }
    }
  end

  article.to_json
end

post '/articles' do
  data = JSON.parse request.body.read
  is_new = !data.include?('id')

  result = {}

  article_id = DB.transaction do
    DB.after_commit do
      result = {id: article_id}
    end
    DB.after_rollback do
      result = {error: $!.to_s}
    end

    article_id = if is_new
      title = data['title']
      DB[:articles].insert(
        title: title,
        url_title: CGI.escape(title.gsub(' ', '_')),
        content: data['content']
      )
    else
      id = data['id']
      DB[:articles].where(id: id).update(
        content: data['content']
      )
      id
    end

    def bind_tags(article_id, data)
      t = DB[:articles_tags]
      tag_ids = data['tagIds']
      existing_ids = t.where('article_id = ?', article_id).map :tag_id
      
      ids_to_delete = existing_ids - tag_ids
      if ids_to_delete.size > 0
        t.where('article_id = ? and tag_id in ?', article_id, ids_to_delete).delete
      end

      # create and bind
      tags = data['tags']
      new_tag_ids = tags.collect { |t| DB[:tags].insert t }

      ids_to_insert = tag_ids - existing_ids + new_tag_ids
      if ids_to_insert.size > 0
        tags_to_insert = ids_to_insert.collect { |id| {article_id: article_id, tag_id: id} }
        t.multi_insert tags_to_insert
      end
    end

    def bind_product_versions(article_id, data)
      t = DB[:articles_product_version_ranges]
      product_version_ranges = data['productVersionRanges']
      range_ids = product_version_ranges.select { |r| r.include? 'id' }.collect { |r| r['id'] }
      existing_ids = t.where('article_id = ?', article_id).map :id

      ids_to_delete = existing_ids - range_ids
      if ids_to_delete.size > 0
        t.where('id in ?', ids_to_delete).delete
      end

      new_ranges = product_version_ranges.reject { |r| r.include? 'id' }
      if new_ranges.size > 0
        ranges_to_insert = new_ranges.collect do |r|
          {
            article_id: article_id,
            start_product_version_id: r['startProductVersionId'],
            end_product_version_id: r['endProductVersionId']
          }
        end
        t.multi_insert ranges_to_insert
      end
    end

    def bind_related_articles(article_id, data)
      t = DB[:related_articles]
      related_article_ids = data['relatedArticleIds']
      existing_ids = t.where(source_article_id: article_id).map :target_article_id

      ids_to_delete = existing_ids - related_article_ids
      if ids_to_delete.size > 0
        t.where('source_article_id = ? and target_article_id in ?', article_id, ids_to_delete).delete
      end

      ids_to_insert = related_article_ids - existing_ids
      if ids_to_insert.size > 0
        related_articles_to_insert = ids_to_insert.collect do |id|
          {source_article_id: article_id, target_article_id: id}
        end
        t.multi_insert related_articles_to_insert
      end
    end

    def bind_attachments(article_id, data)
      t = DB[:articles_attachments]
      attachment_ids = data['attachmentIds']
      existing_ids = t.where(article_id: article_id).map :attachment_id

      ids_to_delete = existing_ids - attachment_ids
      if ids_to_delete.size > 0
        t.where('article_id = ? and attachment_id in ?', article_id, ids_to_delete).delete
      end

      ids_to_insert = attachment_ids - existing_ids
      if ids_to_insert.size > 0
        attachments_to_insert = ids_to_insert.collect do |id|
          {article_id: article_id, attachment_id: id}
        end
        t.multi_insert attachments_to_insert
      end
    end

    bind_tags article_id, data
    bind_product_versions article_id, data
    bind_related_articles article_id, data
    bind_attachments article_id, data
  end

  result.to_json
end

get '/attachments/:id/content' do
  attachment = DB[:attachments].where(id: params[:id]).first
  headers \
    "Content-Type" => attachment[:mime_type],
    "Content-Length" => attachment[:size],
    "Content-Disposition" => "attachment;filename=\"#{attachment[:file_name]}\""
  attachment[:content]
end

post '/attachments' do
  file_info = params[:file]
  file = file_info[:tempfile]
  attachment_id = DB[:attachments].insert(
    file_name: file_info[:filename],
    mime_type: file_info[:type],
    size: file.size,
    content: Sequel.blob(file.read)
  )

  {id: attachment_id}.to_json
end

delete '/attachments/:ids' do
  ids = parse_id_array[params[:ids]]
  if ids.size > 0
    DB[:attachments].where('id in ?', params[:id]).delete
  end
  {status: 1}.to_json
end