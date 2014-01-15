require 'data_mapper'

DataMapper.setup(:default, "sqlite:///#{settings.app_root}/db/#{settings.environment.to_s}.db")

class Tag
  include DataMapper::Resource

  property :id, Serial
  property :name, String
  property :description, String

  has n, :articles_relations, 'ArticleTag'
  has n, :articles, through: :articles_relations
end

class ArticleTag
  include DataMapper::Resource

  property :id, Serial

  belongs_to :tag
  belongs_to :article
end

class Article
  include DataMapper::Resource

  property :id, Serial
  property :readable_id, String
  property :title, String
  property :description, String
  property :content, Text
  property :article_type, String
  property :created_at, DateTime

  has n, :tag_relations, 'ArticleTag'
  has n, :tags, through: :tag_relations

  belongs_to :created_by, 'Consultant'
end

class Consultant
  include DataMapper::Resource

  property :id, Serial
  property :first_name, String
  property :middle_name, String
  property :last_name, String
  property :job_title, String
  property :email, String

  has n, :articles
end

DataMapper.finalize

DataMapper.auto_upgrade!