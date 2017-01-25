class Task < ApplicationRecord
  has_many :shared_tasks
  has_many :shared_users, through: :shared_tasks, source: :user
  # belongs_to :category

  geocoded_by :address  # can also be an IP address
  after_validation :geocode          # auto-fetch coordinates
end
