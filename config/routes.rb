Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :update, :show]
    resource :session, only: [:create, :destroy]
    resources :spots, only: [:index, :update, :create, :destroy, :show]
    resources :bookings, only: [:create, :destroy, :index]
    resources :reviews, only: [:create, :destroy, :index]
    resources :users, only: [:show] do
      resources :spots, only: [:index]
    end
  end

end
