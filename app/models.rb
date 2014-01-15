require 'sinatra/activerecord'

set :database, "sqlite:///#{settings.app_root}/db/#{settings.environment.to_s}.sqlite3"
# set :database, "sqlite3:///db.sqlite3"

class Tag < ActiveRecord::Base
  has_many :articles_relations, class_name: 'ArticleTag'
  has_many :articles, through: :articles_relations
end

class ArticleTag < ActiveRecord::Base
  belongs_to :tag
  belongs_to :article
end

class Article < ActiveRecord::Base
  has_many :tag_relations, class_name: 'ArticleTag'
  has_many :tags, through: :tag_relations

  belongs_to :created_by, class_name: 'Consultant'
end

class Consultant < ActiveRecord::Base
  has_many :articles
end