Rails.application.routes.draw do
  devise_for :users, path_names: { sign_in: "login", sign_out: "logout" }, :controllers => { :omniauth_callbacks => 'users/omniauth_callbacks', :sessions => 'users/sessions', :registrations => 'users/registrations'}

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'articles#index'

  get 'users/' => 'users#index'
  get 'users/:id' => 'users#show', as: :user
  patch 'users/:id' => 'users#update'

  resources :articles do
    resources :comments
  end
end
