import json
from flask import jsonify, session
from database_connection import call_stored_procedure

def user_signup_service(database, json_object):
    firstName = json_object["firstName"]
    lastName = json_object["lastName"]
    email = json_object["email"]
    pw = json_object["password"]
    
    #check if user already exists in the database
    check_user = call_stored_procedure(database, "check_user", (email,))
    #check if pw already exists in the database
    check_pw = call_stored_procedure(database, "check_pw", (pw,))

    if check_user:
      return {"status": "Error", "Message": "An account already exists for this email."}
    elif check_pw:
      return {"status": "Error", "Message": "Password is taken. Choose a different password."}
    else:
      insert_user = call_stored_procedure(database, "insert_user", (firstName, lastName, email, pw))
      return {"status": "Success"}