class PrioritiesController < ApplicationController

  def index
    user_id = params[:user_id]
    if (user_id)
      current_user = User.find(user_id)
      @tasks = current_user.tasks
    end
  end

  def home

  end

  def show
    @task = Task.find_by(id: params[:id])
  end

  def create
    @task = Task.new({title: params[:title], priority_level: params[:priority_level], description: params[:description], address: params[:address], completion_time: params[:completion_time], date_time: params[:date_time], status: true, user_id: current_user.id, category_id: params[:category_id]})
    @task.save

    render json: @task
  end

  # def new

  # end

  def edit
    @task = Task.find_by(id: params[:id])
  end

  def update
    @task = Task.find(params[:id])
    @task.assign_attributes({title: params[:title], priority_level: params[:priority_level], description: params[:description], address: params[:address], completion_time: params[:completion_time], date_time: params[:date_time], status: true, user_id: current_user.id})
    # byebug
    @task.save
  end

end