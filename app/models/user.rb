class User < ApplicationRecord
  has_many :tasks
  has_many :shared_tasks
  has_many :shared, through: :shared_tasks, source: :task
end