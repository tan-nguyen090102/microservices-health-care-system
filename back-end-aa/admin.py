import json
from flask import jsonify, session
from database_connection import call_stored_procedure

def default_service():
    return json.dumps(["False"])

def request_noti_service(database, json_object):
    request_code = json_object["requestCode"]

    get_noti = call_stored_procedure(database,"select_noti", (request_code,),)

    if get_noti is not None:
        list_of_noti = []
        for noti in get_noti:
            list_of_noti.append([noti[0], noti[1]])
        return json.dumps(list_of_noti)
    else:
        return json.dumps("False")

def delete_noti_service(database, json_object):
    notiID = json_object["notiID"]

    call_stored_procedure(database, "delete_entries", ("notifications", 'id = "' + notiID + '"',),)
    database.commit()

    response = request_noti_service(database, json_object)

    return response

def request_user_service(database, json_object):
    request_code = json_object["requestCode"]

    get_users = call_stored_procedure(database,"select_users_with_code", (request_code, "'id'",),)

    if get_users is not None:
        list_of_users = []
        for user in get_users:
            list_of_users.append([user[0], user[1] + " " + user[2]])
        return json.dumps(list_of_users)
    else:
        return json.dumps("False")

def insert_user_service(database, json_object):
    request_code = json_object["requestCode"]
    first_name = json_object["firstName"]
    last_name = json_object["lastName"]
    email = json_object["email"]
    password = json_object["password"]
    authorization_code = json_object["authorizationCode"]

    get_users = call_stored_procedure(database,"select_all_from_table", ("users",),)

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
    
    response = request_user_service(database, json_object)
    return response



def delete_user_service(database, json_object):
    userID = json_object["userID"]

    call_stored_procedure(database, "delete_entries", ("users", 'id = "' + userID + '"',),)
    database.commit()

    response = request_user_service(database, json_object)

    return response