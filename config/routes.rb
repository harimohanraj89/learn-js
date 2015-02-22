Rails.application.routes.draw do
  root 'application#index'
  resources :sections, only: [:index, :create, :update, :destroy]
end
