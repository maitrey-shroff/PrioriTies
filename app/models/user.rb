class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable\

  has_many :tasks
  has_many :shared_tasks, through: :shared_tasks, source: :task


  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
