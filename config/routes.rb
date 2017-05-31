Rails.application.routes.draw do


  get 'galtec/Inicio'
  get 'galtec/Nosotros'
  get 'galtec/Contacto'
  get 'galtec/Noticias'
  get 'galtec/Servicios'

  get 'welcome/index'
  get 'welcome/about'
  get 'welcome/contact'
  get 'welcome/news'
  get 'welcome/services'


  root 'galtec#Inicio'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
