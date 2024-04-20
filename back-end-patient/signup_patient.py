#make changes
import json
from flask import jsonify, session
from database_connection import call_stored_procedure

def user_signup_service(database, json_object):
    firstName = json_object["firstName"]
    lastName = json_object["lastName"]
    email = json_object["email"]
    pw = json_object["password"]
    
    #check is user already exists in the database
    check_user = call_stored_procedure(database, "check_user", (email,))

    if check_user is None:
        # Add user into database
        insert_user = call_stored_procedure(database, "insert_user", (firstName, lastName, email, pw))
        return json.dumps(["Successful"])
    else:
        return json.dumps(["Unsuccessful"])


