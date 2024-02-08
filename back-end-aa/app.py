import json
import os
from flask import Flask, jsonify, request, session
from flask_session import Session
from cas import CASClient
from flask_cors import CORS, cross_origin

app = Flask(__name__)
SECRET_KEY = os.urandom(32)
SESSION_TYPE = 'filesystem'
app.config.from_object(__name__)
Session(app)
CORS(app)

userName = "daniel"
password = "12345"

@app.route("/cas-login", methods = ["GET", "POST"])
@cross_origin(supports_credentials=True)
def login():      
    if request.method == "POST":
        json_object = request.json
        if "url" in json_object:
            user = json_object["user"]
            session["url"] = json_object["url"]
            if "user" in session:
                return json.dumps(["Authorize", user])
            else:
                return json.dumps(["False", user])
        elif "userID" in json_object:
            userID = json_object["userID"]
            pw = json_object["password"]
            url = json_object["nexturl"] 

            if (userID == userName and pw == password):
                session["user"] = userID
                session["url"] = url
                return jsonify(["Authorized", url])
        else:
            return json.dumps(["False", session.get("url")])
    return jsonify("Done")


@app.route("/cas-logout", methods = ["GET", "POST"])
@cross_origin(supports_credentials=True)
def logout():
    if request.method == "POST":
        json_object = request.json
        session.clear()
        return jsonify("Done")


if __name__ == "__main__":
    app.run()