get '/' do
  send_file File.expand_path('index.html', settings.public_folder)
end

get '/search' do
  q = params[:query]

end

get '/tags' do
  q = Tag.select(:id, :title).order(:title)

  q = q.where("title LIKE ?", params[:query] + "%") if params[:query]

  if params[:exclude]
    ids = parse_id_array(params[:exclude])
    q = q.where("id NOT IN (?)", ids) if ids.size > 0
  end

  q.all.to_json
end

get '/product-versions' do
  q = ProductVersion.select(:id, :version).order(:version)

  q = q.where("product_id = ?", params[:product_id]) if params[:product_id]

  q.all.to_json
end

# products
get '/products' do
  q = Product.select(:id, :title).order(:title)

  q = q.where("title like ?", params[:query] + "%") if params[:query]

  q.all.to_json
end

get '/articles/:id' do
  article = Article.find(params[:id])
  data = article.as_json
  data['tags'] = article.tags.select([:id, :title]).as_json
  data['relatedArticles'] = article.related_articles.select([:id, :title, :description]).as_json
  # data['relatedArticles'] = article.related_article_joins.select([:target_article_id]).as_json
  # data['productVersions'] = article.prod

  data.to_json
end

post '/articles' do
  data = JSON.parse request.body.read
  is_new = !data.include?('id')

  article = Article.transaction do
    article = if is_new
      article_only_data = data.select { |k, v| ['title', 'description', 'content'].include? k }
      Article.create(article_only_data)
    else
      Article.find
    end

    def create_tags(article, data)
      puts data.to_s
      tags = data['tags']
      new_tag_ids = Tag.create(tags.reject { |t| t.include? 'id' }).collect(&:id)
      new_existing_tag_ids = tags.select { |t| t.include? 'id' }.collect { |t| t['id'] }
      all_tag_ids = new_existing_tag_ids + new_tag_ids
      existing_tag_ids = ArticleTag.where("article_id = ? AND tag_id IN (?)", article.id, new_existing_tag_ids).pluck(:tag_id)
      new_relations = (all_tag_ids - existing_tag_ids).collect { |t|
        {article_id: article.id, tag_id: t}
      }
      ArticleTag.create new_relations
    end

    def create_article_products(article, data)
      article_products = data[:articleProducts]
      ids = article_products.collect(&:id)
      existing_ids = ArticleProduct.where("article_id = ? AND product_version_id IN (?)", article.id, ids).pluck(:product_version_id)
      new_relations = article_products.reject { |p|
        existing_ids.include? p[:id]
      }.collect { |p|
        {article_id: article.id, product_version_id: p[:id], applies_to: p[:appliesTo]}
      }
      ArticleProduct.create new_relations
    end

    def create_related_articles(article, data)
      related_articles = data[:relatedArticles]
      ids = related_articles.collect &:id
      existing_ids = RelatedArticle.where("source_article_id = ? AND target_article_id IN (?)", article.id, ids).pluck(:target_article_id)
      new_relations = related_articles.reject { |a|
        existing_ids.include? a[:id]
      }.collect{ |a|
        {source_article_id: article.id, target_article_id: a[:id]}
      }
      RelatedArticle.create new_relations
    end

    create_tags article, data
    # create_article_products
    # create_related_articles

    article
  end

  if article
    {id: article.id, status: 1}.to_json
  else
    {status: 0}.to_json
  end
end