import requests
import json

def test_input_post_request():
    with open("testData.json", "r") as test_file:
        json_data = json.load(test_file)

    server_url = json_data["url"]
    
    response = requests.post(server_url, json=json_data["post-request"])
    print(response.__dict__)
    assert response.status_code == 200


def test_url_post_request():
    with open("testData.json", "r") as test_file:
        json_data = json.load(test_file)

    server_url = json_data["url"]
    
    response = requests.post(server_url, json=json_data["target-url"])
    print(response.__dict__)
    assert response.status_code == 200