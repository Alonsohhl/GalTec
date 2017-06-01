Rails.application.routes.draw do

  get 'static_pages/index'

  root 'static_pages#index'
  get '/nosotros' , to: 'galtec#Nosotros'
  get '/Contacto' , to: 'galtec#Contacto'
  get '/Noticias' , to: 'galtec#Noticias'
  get '/servicios', to: 'galtec#Servicios'

  get 'welcome/index'
  get '/about' ,  to:'static_pages#about'
  get '/contact' ,  to:'static_pages#contact'
  get '/news' ,  to:'static_pages#news'
  get '/services' ,  to:'static_pages#services'



  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
