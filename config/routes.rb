Rails.application.routes.draw do

  root to: "static_page#root"

  resources :users, only: [:create]
  resource :session, only: [:create, :destroy, :show]

  namespace :api, defaults: { format: :json } do
    resources :keysets, except: [:edit, :new]
  end

end
