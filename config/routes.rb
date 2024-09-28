Rails.application.routes.draw do
  root to: "static_pages#top"

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  devise_scope :user do
    get "signup", to: "users/registrations#new"
    get "login", to: "users/sessions#new"
    get "logout", to: "users/sessions#destroy"
  end

  resources :user_informations, only: [:show]
  resources :spots, only: [:new, :create, :index, :show, :edit]
end
