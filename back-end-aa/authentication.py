import json
from flask import jsonify, session
from database_connection import call_stored_procedure

def default_service():
    return json.dumps(["False", session.get("url")])

def url_login_service(json_object):      
    user = json_object["user"]

    # Pop the old url to get the new one if presents
    if (session.get("url")):
        session.pop("url", None)

    session["url"] = json_object["url"]
    
    # Check if  the user has logged in
    if "user" in session:
        return json.dumps(["Authorize", user, id(session), session.get("authorizedID")])
    else:
        return json.dumps(["False", user])


def user_login_service(database, json_object):      
    username = json_object["userID"]
    pw = json_object["password"]

    #Get the users from the database based on the email username
    get_user = call_stored_procedure(database, "select_user", (username,))

    if get_user is not None:

        # Iterate through the possible list of user
        for user in get_user:
            if (user[4] == pw):

                session["user"] = user[0]
                session["authorizedID"] = user[5]
                return json.dumps(["Authorized", session.get("url"), user[5]])
            else:
                continue

        # User is not found with correct password
        return json.dumps(["Invalid", session.get("url")])   
    else:
        return json.dumps(["Invalid", session.get("url")])


def logout_service():
    session.pop("user", None)
    session.pop("url", None)
    session.pop("authorizedID", None)
    session.clear()
    return jsonify("Done")


