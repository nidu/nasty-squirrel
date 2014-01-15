# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140115175606) do

  create_table "articles", force: true do |t|
    t.string   "title"
    t.text     "description"
    t.text     "content"
    t.string   "article_type"
    t.integer  "created_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "articles_attachments", id: false, force: true do |t|
    t.integer "article_id",    null: false
    t.integer "attachment_id", null: false
  end

  create_table "articles_products", id: false, force: true do |t|
    t.integer "article_id",         null: false
    t.integer "product_version_id", null: false
    t.string  "also_applies_to"
  end

  create_table "articles_tags", id: false, force: true do |t|
    t.integer "article_id", null: false
    t.integer "tag_id",     null: false
  end

  create_table "attachments", force: true do |t|
    t.string "title"
    t.string "file_name"
    t.text   "description"
    t.string "mime_type"
    t.binary "content"
  end

  create_table "consultants", force: true do |t|
    t.string "first_name"
    t.string "middle_name"
    t.string "last_name"
    t.string "job_title"
    t.string "email"
  end

  create_table "consultants_products", id: false, force: true do |t|
    t.integer "consultant_id", null: false
    t.integer "product_id",    null: false
  end

  create_table "features", force: true do |t|
    t.string "title"
    t.text   "description"
    t.string "server"
    t.string "version"
  end

  create_table "product_aliases", force: true do |t|
    t.integer "product_id", null: false
    t.string  "alias"
  end

  create_table "product_versions", force: true do |t|
    t.integer "product_id",               null: false
    t.string  "version"
    t.integer "release_notes_article_id"
  end

  create_table "products", force: true do |t|
    t.string  "code"
    t.string  "title"
    t.text    "description"
    t.binary  "icon"
    t.integer "product_line_id"
    t.boolean "is_product_line"
  end

  create_table "products_features", id: false, force: true do |t|
    t.integer "product_version_id", null: false
    t.integer "feature_id",         null: false
  end

  create_table "related_articles", force: true do |t|
    t.integer "source_article_id", null: false
    t.integer "target_article_id", null: false
  end

  create_table "tags", force: true do |t|
    t.string   "title"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
