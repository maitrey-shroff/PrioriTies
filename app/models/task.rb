class Task < ApplicationRecord
  belongs_to :user
  has_many :shared_tasks
  has_many :shared_users, through: :shared_tasks, source: :user
end
