require 'test_helper'

class GaltecControllerTest < ActionDispatch::IntegrationTest
  test "should get Inicio" do
    get galtec_Inicio_url
    assert_response :success
  end

end
