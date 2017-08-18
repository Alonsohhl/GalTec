RailsAdmin.config do |config|
  ### Popular gems integration

  config.authenticate_with do# aca se hace la validacio
   warden.authenticate! scope: :usuario
  end

  config.authorize_with do
    redirect_to main_app.root_path unless usuario_signed_in? #&& current_usuario.admin ==true
  end


  config.model Post do
    field :title do
        label "Titulo"
    end

    edit do
      # For RailsAdmin >= 0.5.0
      field :content, :ck_editor
      # For RailsAdmin < 0.5.0
      # field :description do
      #   ckeditor true
      # end
    end
  end


# config.current_user_method(&:user)


# #&& current_usuario.admin ==true #warden.user.admin == true
  ## == Devise ==


  ## == Cancan ==
  # config.authorize_with :cancan

  ## == Pundit ==
  # config.authorize_with :pundit

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/sferik/rails_admin/wiki/Base-configuration

  ## == Gravatar integration ==
  ## To disable Gravatar integration in Navigation Bar set to false
  # config.show_gravatar = true

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end
end
