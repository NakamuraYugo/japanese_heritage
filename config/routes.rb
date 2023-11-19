Rails.application.routes.draw do
  root to: "static_pages#top"

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
end
