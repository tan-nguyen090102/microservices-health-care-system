import json
from flask import Blueprint, jsonify, request, session
from flask_cors import cross_origin
from database_connection import database, execute_stored_procedure

auth_bp = Blueprint("auth_bp", __name__)

@auth_bp.route("/cas-login", methods = ["GET", "POST"])
@cross_origin(supports_credentials=True)
def login(database = database):      
    if request.method == "POST":
        json_object = request.json
        if "url" in json_object:
            user = json_object["user"]

            #Pop the old url to get the new one if presents
            if (session.get("url")):
                session.pop("url", None)

            session["url"] = json_object["url"]
            #print(session.get("url"))
            if "user" in session:
                return json.dumps(["Authorize", user, id(session), session.get("authorizedID")])
            else:
                return json.dumps(["False", user])
        elif "userID" in json_object:
            username = json_object["userID"]
            pw = json_object["password"]

            #Get the user from the database
            get_user = execute_stored_procedure(database, "select_user", (username,))

            if get_user is not None:
                user = get_user[0]
                if (user[4] == pw):

                    session["user"] = user[0]
                    session["authorizedID"] = user[5]
                    return json.dumps(["Authorized", session.get("url"), user[5]])
                else:
                    return json.dumps(["Invalid", session.get("url")])
            else:
                return json.dumps(["Invalid", session.get("url")])
        else:
            return json.dumps(["False", session.get("url")])
            
    return jsonify("Done")


@auth_bp.route("/cas-logout", methods = ["GET", "POST"])
@cross_origin(supports_credentials=True)
def logout():
    if request.method == "POST":
        session.pop("user", None)
        session.pop("url", None)
        session.pop("authorizedID", None)
        session.clear()
        return jsonify("Done")


