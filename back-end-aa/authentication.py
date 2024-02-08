import json
from flask import Blueprint, jsonify, request, session
from flask_cors import cross_origin

userName = "daniel"
password = "12345"

auth_bp = Blueprint("auth_bp", __name__)

@auth_bp.route("/cas-login", methods = ["GET", "POST"])
@cross_origin(supports_credentials=True)
def login():      
    if request.method == "POST":
        json_object = request.json
        if "url" in json_object:
            user = json_object["user"]
            session["url"] = json_object["url"]
            if "user" in session:
                return json.dumps(["Authorize", user, id(session)])
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


@auth_bp.route("/cas-logout", methods = ["GET", "POST"])
@cross_origin(supports_credentials=True)
def logout():
    if request.method == "POST":
        json_object = request.json
        session.pop("user", None)
        session.pop("url", None)
        session.clear()
        return jsonify("Done")


