# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Task.destroy_all
Category.destroy_all

# create_table "tasks", force: :cascade do |t|
#   t.integer  "user_id"
#   t.integer  "category_id"
#   t.string   "title"
#   t.string   "description"
#   t.string   "address"
#   t.integer  "completion_time"
#   t.datetime "date_time"
#   t.boolean  "status"
#   t.boolean  "pinned"
#   t.datetime "created_at",      null: false
#   t.datetime "updated_at",      null: false
#   t.integer  "priority_level"
# end

10.times do
  Category.create({
    name: Faker::Color.color_name
    })
end

User.ids.each do |user_id|
  25.times do
    Task.create({
      user_id: user_id
      category_id: 
      title:
      description:
      address:
      completion_time:
      date_time:
      status:
      pinned:
      priority_level:
      })

  end