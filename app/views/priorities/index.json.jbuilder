json.array! @tasks.each do |task|
  json.partial! 'task.json.jbuilder', task: task
end