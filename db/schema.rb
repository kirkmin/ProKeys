# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20170418083934) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "keysets", force: :cascade do |t|
    t.integer  "user_id",      null: false
    t.string   "title",        null: false
    t.string   "q"
    t.string   "w"
    t.string   "e"
    t.string   "r"
    t.string   "t"
    t.string   "y"
    t.string   "u"
    t.string   "i"
    t.string   "o"
    t.string   "p"
    t.string   "openbracket"
    t.string   "closebracket"
    t.string   "a"
    t.string   "s"
    t.string   "d"
    t.string   "f"
    t.string   "g"
    t.string   "h"
    t.string   "j"
    t.string   "k"
    t.string   "l"
    t.string   "semicolon"
    t.string   "quotation"
    t.string   "z"
    t.string   "x"
    t.string   "c"
    t.string   "v"
    t.string   "b"
    t.string   "n"
    t.string   "m"
    t.string   "comma"
    t.string   "period"
    t.string   "slash"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "keysets", ["user_id"], name: "index_keysets_on_user_id", using: :btree

  create_table "notes", force: :cascade do |t|
    t.integer  "recording_id"
    t.string   "pitch",        null: false
    t.integer  "start",        null: false
    t.integer  "duration",     null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "notes", ["recording_id"], name: "index_notes_on_recording_id", using: :btree

  create_table "recordings", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "duration",   null: false
    t.string   "title",      null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "recordings", ["user_id"], name: "index_recordings_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree
  add_index "users", ["username"], name: "index_users_on_username", using: :btree

end
