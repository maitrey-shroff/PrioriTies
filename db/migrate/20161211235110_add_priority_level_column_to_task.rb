class AddPriorityLevelColumnToTask < ActiveRecord::Migration[5.0]
  def change
    add_column :tasks, :priority_level, :integer
  end
end
