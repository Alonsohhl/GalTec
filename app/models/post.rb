class Post < ApplicationRecord
  mount_uploader :img, PostMainUploader
end
