import json
import uuid
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
        return json.dumps(["Authorize", session.get("user"), id(session), session.get("authorizedID"), session.get("name")])
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
                session["name"] = user[1] + " " + user[2]
                return json.dumps(["Authorized", session.get("url"), user[5], session.get("name")])
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


def user_login_forgot_pw_service(database, json_object): 
    print("In user_login_forgot_pw_service",json_object)     
    username = json_object["userID"]
    print("In user_login_forgot_pw_service username",username) 
    #Get the users from the database based on the email username
    get_user = call_stored_procedure(database, "select_user", (username,))
    print("In user_login_forgot_pw_service get_user",get_user) 
    if get_user is not None:

        # Iterate through the possible list of user
        for user in get_user:
            userDbId = user[0]
            resetCode = str(uuid.uuid4())
            # update user with access reset code
            call_stored_procedure(database, "update_user_password_reset_code", (userDbId, resetCode))
            print("In user_login_forgot_pw_service resetCode",resetCode)
            return dict(status = "success", resetCode = resetCode)
    else:
        print("In user_login_forgot_pw_service Failed to find user",username)
        return dict(status = "failure", errorMessage = "Failed to find user")


def user_login_change_pw_service(database, json_object): 
    print("In user_login_change_pw_service",json_object)     
    username = json_object["userID"]
    authCode = json_object["authCode"]
    password = json_object["password"]
    print("In user_login_change_pw_service username, authCode, password",username, authCode, password) 
    #Get the users from the database based on the email username
    get_user = call_stored_procedure(database, "select_user", (username,))
    print("In user_login_change_pw_service get_user",get_user) 
    if get_user is not None:

        # Iterate through the possible list of user
        for user in get_user:
            # validate auth code
            if (user[6] == authCode): 
                # change password 
                userDbId = user[0]
                #update_user_password(database, userDbId, password)
                call_stored_procedure(database, "update_user_password", (userDbId, password))
                return dict(status= "success")
            else:
                continue
        print("In user_login_change_pw_service authCode and username doesn't match",username)
        return dict(status = "failure", errorMessage = "Username and reset code does not match.")
    else:
        print("In user_login_change_pw_service Failed to find user",username)
        return dict(status = "failure", errorMessage = "Failed to find user")
    

def validate_change_pw_input(json_object):
    print("In validate_change_pw_input  ", json_object)
    keys = ['userID', 'password', 'passwordConfirm', 'authCode']
    for key in keys:
        if key in json_object:
            continue
        else:
            response = dict(status = "failure", errorMessage = "Invalid input, please populate userid, password,passwordConfirm,authCode.")
            return response
    password = json_object["password"]
    passwordConfirm = json_object["passwordConfirm"]
    print("In validate_change_pw_input validating pass match  ")
    if password != passwordConfirm:
        response = dict(status = "failure", errorMessage = "Invalid input, password does not match.")
        return response
    print("In validate_change_pw_input validatiion success.")
    return dict(status = "success")