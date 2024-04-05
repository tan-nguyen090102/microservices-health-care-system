import requests
import json

# test forgot password and change password
def test_forgotpw_input_post_request():
    with open("testdataforgotpw.json", "r") as test_file:
        json_data = json.load(test_file)
    #test_forgotpw_input_post_request()
    server_url = json_data["forgot-url"]

    #forgot password
    response = requests.post(server_url, json=json_data["post-request"])
    print(response.__dict__)
    assert response.status_code == 200

    #change password when forgot pw validate userid
    resetCode = response._content.decode("utf-8").replace('"','').replace('\n','')
    print(resetCode)
    changePwJsonData = json_data["post-request"]
    changePwJsonData["authCode"] = resetCode
    changePwJsonData["password"] = "changepw"
    changePwJsonData["passwordConfirm"] = "changepw"
    
    #reassign url to chnage-url
    server_url = json_data["change-url"]

    changePwResponse = requests.post(server_url, json=changePwJsonData)
    print(changePwResponse.__dict__)
    assert changePwResponse.status_code == 200

# excecutes test    
test_forgotpw_input_post_request()   