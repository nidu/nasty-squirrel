require 'sinatra/activerecord'

set :database, "sqlite:///#{settings.app_root}/db/#{settings.environment.to_s}.sqlite3"

class Tag < ActiveRecord::Base
  has_many :articles_relations, class_name: 'ArticleTag'
  has_many :articles, through: :articles_relations
end

class ArticleTag < ActiveRecord::Base
  self.table_name = 'articles_tags'

  belongs_to :tag
  belongs_to :article
end

class Article < ActiveRecord::Base
  has_many :tag_relations, class_name: 'ArticleTag'
  has_many :tags, through: :tag_relations

  has_many :product_versions

  has_many :related_article_joins, class_name: 'RelatedArticle', foreign_key: 'source_article_id'
  has_many :related_articles, class_name: 'Article', through: :related_article_joins

  belongs_to :created_by, class_name: 'Consultant'
end

class Consultant < ActiveRecord::Base
  has_many :articles
end

class Product < ActiveRecord::Base
	has_many :versions, class_name: 'ProductVersion'
end

class ProductVersion < ActiveRecord::Base
	belongs_to :product
end

class ArticleProduct < ActiveRecord::Base
  self.table_name = 'articles_products'

  belongs_to :article
  belongs_to :product_version
end

class RelatedArticle < ActiveRecord::Base
  belongs_to :source_article, class_name: 'Article'
  belongs_to :target_article, class_name: 'Article'
end