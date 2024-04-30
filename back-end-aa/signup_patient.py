import json
from flask import jsonify, session
from database_connection import call_stored_procedure

def user_signup_service(database, json_object):
    first_name = json_object["firstName"]
    last_name = json_object["lastName"]
    email = json_object["email"]
    password = json_object["password"]
    authorization_code = json_object["authorizationCode"]
    
    #check if user already exists in the database
    check_user = call_stored_procedure(database, "check_user", (email,))
    #check if pw already exists in the database
    check_pw = call_stored_procedure(database, "check_pw", (password,))

    if check_user:
      response_data = {"status": "Error", "Message": "An account already exists for this email."}
      return response_data
    elif check_pw:
      response_data = {"status": "Error", "Message": "Password is taken. Choose a different password."}
      return response_data
    else:
      get_users = call_stored_procedure(database,"select_all_from_table", ("users",),)
<<<<<<< HEAD

      if get_users is not None:
            biggest_entry = 0
            for user in get_users:
              id = int([*(user[0])][1])

            if (biggest_entry < id):
                biggest_entry = id

      
      result = call_stored_procedure(database, 
                          "insert_entry", 
                          ("users", 
                           "id, first_name, last_name, email, password, authorization_code", 
                           "'U" + str(biggest_entry + 1) + "', '" + first_name + "', '" + last_name + "', '" + email + "', '" + password + "', '" + authorization_code + "'"),)
      database.commit()
      response_data = {"status": "Success"}
      return response_data
=======
>>>>>>> sign-up-page

      if get_users is not None:
            biggest_entry = 0
            for user in get_users:
              id = int([*(user[0])][1])

            if (biggest_entry < id):
                biggest_entry = id

      
      result = call_stored_procedure(database, 
                          "insert_entry", 
                          ("users", 
                           "id, first_name, last_name, email, password, authorization_code", 
                           "'U" + str(biggest_entry + 1) + "', '" + first_name + "', '" + last_name + "', '" + email + "', '" + password + "', '" + authorization_code + "'"),)
      database.commit()
      response_data = {"status": "Success"}
      return response_data