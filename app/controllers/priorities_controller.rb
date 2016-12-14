class PrioritiesController < ApplicationController

  def index
    @tasks = Task.all
  end

  def create
    @task = Task.new({title: params[:title], description: params[:description], address: params[:address], completion_time: params[:completion_time], date_time: params[:date_time], status: true, user_id: 1})
    @task.save

    redirect_to "/priorities"

  end

  # def new

  # end

  def edit
    @task = Task.find_by(id: params[:id])
  end

  def update
    @task = Task.find(params[:id])
    @task.assign_attributes({title: params[:title], description: params[:description], address: params[:address], completion_time: params[:completion_time], date_time: params[:date_time], status: true, user_id: 1})
    @task.save

  end

end