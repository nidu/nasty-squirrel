Sequel.migration do
  up do
    create_table(:articles) do
      primary_key :id

      String :title
      String :url_title
      String :description
      String :content, text: true
      foreign_key :author_id, :consultants
      DateTime :created_at
      DateTime :updated_at

      unique :url_title
    end

    create_join_table({source_article_id: :articles, target_articles_id: :articles}, name: :related_articles)

    create_table(:tags) do
      primary_key :id

      String :title
      String :description
    end

    create_join_table(article_id: :articles, tag_id: :tags)

    create_table(:attachments) do
      primary_key :id

      String :title
      String :file_name
      String :mime_type
      File :content
    end

    create_join_table(article_id: :articles, attachment_id: :attachments)

    create_table(:consultants) do
      primary_key :id

      String :first_name
      String :middle_name
      String :last_name
      String :job_title
      String :email
      String :phone_mobile
      String :phone_work
      DateTime :created_at
      DateTime :updated_at

      unique :email
    end

    create_table(:products) do
      primary_key :id

      String :code
      String :title
      String :description
      File :icon
      foreign_key :product_line_id, :products
      TrueClass :is_product_line
      foreign_key :product_article_id, :articles
      DateTime :created_at
      DateTime :updated_at

      unique :code
    end

    create_table(:product_versions) do
      primary_key :id

      foreign_key :product_id, :products
      String :version
      foreign_key :release_notes_id, :articles
      DateTime :created_at
      DateTime :updated_at

      unique [:product_id, :version]
    end

    create_table(:product_aliases) do
      primary_key :id

      foreign_key :product_id, :products
      String :alias
    end

    create_table(:article_product_versions) do
      primary_key [:article_id, :product_version_is]

      foreign_key :article_id, :articles
      foreign_key :product_version_is, :product_versions
      String :applies_to
      index [:article_id, :product_version_is]
    end

    create_join_table(consultant_id: :consultants, product_id: :products)

    create_table(:features) do
      primary_key :id

      String :title
      String :description
      String :server
      String :version

      unique [:title, :server, :version]
    end

    create_join_table(product_id: :products, feature_id: :features)
  end

  down do
    drop_table(:articles)
    drop_table(:related_articles)
    drop_table(:tags)
    drop_table(:articles_tags)
    drop_table(:attachments)
    drop_table(:articles_attachments)
    drop_table(:consultants)
    drop_table(:consultants_products)
    drop_table(:products)
    drop_table(:product_aliass)
    drop_table(:product_versions)
    drop_table(:features)
    drop_table(:products_features)
    drop_table(:article_product_versions)
  end
end