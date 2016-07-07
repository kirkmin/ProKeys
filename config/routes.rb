Rails.application.routes.draw do

  root to: "static_page#root"

  resources :users
  resource :session

end
