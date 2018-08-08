# json.extract! @user, :id, :name, :email, :img_url
json.partial! '/api/users/user', user: @user
