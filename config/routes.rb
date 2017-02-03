Rails.application.routes.draw do
  
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  root to: "priorities#home"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :priorities

  get "/highPriority", to: "priorities#highPriority"


end
