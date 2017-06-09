module ApplicationHelper
  #corregir el titulo de las aplicaciones
  def SetTitle(pagetitle="")
    basetitle="GalTec - Ideas en acción"
    if pagetitle.empty?
      basetitle
    else
      pagetitle=pagetitle+" | "+basetitle
    end
  end

  def Set_Menu_Class(menuclass="")
    basemenuclass="main-header services home"
    case menuclass
      when "Inicio"
        #["main-header services home","overflow: hidden"]
        #'class=main-header services home style=overflow: hidden '
        content_tag :div,class:"main-header services home",style:"overflow: hidden"
      else
        'class="interior-header green"'
    end
  end




end
