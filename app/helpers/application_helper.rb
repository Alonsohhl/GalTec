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




end
