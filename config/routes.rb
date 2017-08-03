Rails.application.routes.draw do


  mount Ckeditor::Engine => '/ckeditor'
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :usuarios
  resources :posts
  #get 'static_pages/index'

  root 'static_pages#index'

  #get 'welcome/index'
  #get '/about' ,  to:'static_pages#about'
  get '/nosotros' ,  to:'static_pages#about'

  #get '/contact' ,  to:'static_pages#contact'
  get '/contacto' ,  to:'static_pages#contact'

  #get '/services' ,  to:'static_pages#services'
  get '/servicios' ,  to:'static_pages#services'


  #get '/index' ,  to:'static_pages#index'
  get '/news' ,  to:'static_pages#news'

  get '/blog' ,  to:'posts#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
