Rails.application.routes.draw do
  devise_for :users, path_names: { sign_in: "login", sign_out: "logout" }, :controllers => { :omniauth_callbacks => 'users/omniauth_callbacks', :sessions => 'users/sessions', :registrations => 'users/registrations'}

  get   '/login', :to => 'sessions#new', :as => :login
  match '/auth/:provider/callback', :to => 'sessions#create'
  match '/auth/failure', :to => 'sessions#failure'

  root 'articles#index'
  resources :users

  resources :articles do
    resources :comments
  end
end
