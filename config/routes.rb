Rails.application.routes.draw do
  root 'static_pages#top'

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
end
