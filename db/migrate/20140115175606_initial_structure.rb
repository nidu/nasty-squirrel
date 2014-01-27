class InitialStructure < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.string :url_title
      t.string :title
      t.text :description
      t.text :content
      t.string :article_type
      t.integer :created_by
      t.timestamps
    end

    create_table :related_articles do |t|
      t.integer :source_article_id, null: false
      t.integer :target_article_id, null: false
    end

    create_table :attachments do |t|
      t.string :title
      t.string :file_name
      t.text :description
      t.string :mime_type
      t.binary :content
    end

    create_join_table :articles, :attachments

    create_table :tags do |t|
      t.string :title
      t.text :description
      t.timestamps
    end

    create_join_table :articles, :tags

    create_table :consultants do |t|
      t.string :first_name
      t.string :middle_name
      t.string :last_name
      t.string :job_title
      t.string :email
    end

    create_table :products do |t|
      t.string :code
      t.string :title
      t.text :description
      t.binary :icon
      t.integer :product_line_id
      t.boolean :is_product_line
    end

    create_join_table :consultants, :products

    create_table :product_aliases do |t|
      t.integer :product_id, null: false
      t.string :alias
    end

    create_table :product_versions do |t|
      t.integer :product_id, null: false
      t.string :version
      t.integer :release_notes_article_id
    end

    create_join_table :articles, :product_versions, table_name: :articles_products do |t|
      t.string :applies_to      
    end

    create_table :features do |t|
      t.string :title
      t.text :description
      t.string :server
      t.string :version
    end

    create_join_table :product_versions, :features, table_name: :products_features
  end
end
