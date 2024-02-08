import json
from flask import Flask, jsonify, request, session
from cas import CASClient
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
app.secret_key = 'V7nlCN90LPHOTA9PGGyf'

userName = "daniel"
password = "12345"
url = ""

@app.route("/cas-login", methods = ["GET", "POST"])
@cross_origin()
def login():
    global url
    if request.method == "GET":
        response_list = []
        print(session.get("user"))
        if session.get("user") is not None:
            print("Has user")
            response_list.append(session["user"])
        else:
            print("No user")
            response_list.append("False")
        response_list.append(url)

        print(response_list)
        return json.dumps(response_list)
    if request.method == "POST":
        json_object = request.json
        if "url" in json_object:
            url = json_object["url"]
        elif "userID" in json_object:
            userID = json_object["userID"]
            pw = json_object["password"] 

            if (userID == userName and pw == password):
                session["user"] = userID
                print(session.get("user"))
                return jsonify(["Authorized", url])
    return jsonify("Done")

if __name__ == "__main__":
    app.run()