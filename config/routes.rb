Rails.application.routes.draw do

  #get 'static_pages/index'

  root 'static_pages#index'

  #get 'welcome/index'
  get '/about' ,  to:'static_pages#about'
  get '/contact' ,  to:'static_pages#contact'
  get '/news' ,  to:'static_pages#news'
  get '/services' ,  to:'static_pages#services'
  get '/index' ,  to:'static_pages#index'



  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
