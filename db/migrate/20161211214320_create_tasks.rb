class CreateTasks < ActiveRecord::Migration[5.0]
  def change
    create_table :tasks do |t|
      t.integer :user_id
      t.integer :category_id
      t.string :title
      t.string :description
      t.string :address
      t.integer :completion_time
      t.datetime :date_time
      t.boolean :status
      t.boolean :pinned

      t.timestamps
    end
  end
end
