import json
from flask import jsonify, session
from database_connection import call_stored_procedure

def default_service():
    return json.dumps(["False"])

def request_noti_service(database, json_object):
    request_code = json_object["requestCode"]

    get_noti = call_stored_procedure(database,"select_noti", (request_code,))

    if get_noti is not None:
        list_of_noti = []
        for noti in get_noti:
            list_of_noti.append([noti[0], noti[1]])
        return json.dumps(list_of_noti)
    else:
        return json.dumps("False")

def delete_noti_service(database, json_object):
    notiID = json_object["notiID"]
    return json.dumps(["Sucess", ["A", "B", "C"].pop(notiID)])

