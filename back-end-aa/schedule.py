import json
from datetime import datetime
from flask import jsonify, session
from database_connection import call_stored_procedure

def fetch_date_event_service(database, json_object):
    userID = json_object["userID"]
    start_time = str(datetime.fromisoformat(json_object["startTime"])).split(".")[0]
    end_time = str(datetime.fromisoformat(json_object["endTime"])).split(".")[0]
    get_schedules = call_stored_procedure(database, "select_schedule", (userID, start_time, end_time,),)

    if get_schedules is not None:
        list_of_schedules= []
        for schedule in get_schedules:
            list_of_schedules.append([schedule[0], schedule[1], schedule[7], schedule[8], schedule[3], schedule[4], schedule[5]])
        return json.dumps(list_of_schedules, default=str)
    else:
        return json.dumps("False")
    

def insert_date_event_service(database, json_object):
    host_id = json_object["hostID"]
    recipient_name = str(json_object["recipientName"]).split(" ")
    content = json_object["content"]
    start_time = str(datetime.fromisoformat(json_object["startTime"])).split(".")[0]
    end_time = str(datetime.fromisoformat(json_object["endTime"])).split(".")[0]

    # Check user
    try:
        get_user = call_stored_procedure(database,
                                      "select_from_table_with_condition",
                                      ("*",
                                       "users",
                                       "first_name = '" + recipient_name[0] + "' AND last_name = '" + recipient_name[1] + "'"))
    except IndexError:
        return json.dumps("404")
    
    if get_user is not None:
        recipient_id = get_user[0][0]
        get_schedules = call_stored_procedure(database,"select_all_from_table", ("schedules",),)

        if get_schedules is not None:
            biggest_entry = 0
            for user in get_schedules:
                id = int([*(user[0])][1])

                if (biggest_entry < id):
                    biggest_entry = id
        else:
            biggest_entry = 1

        result = call_stored_procedure(database,
                                   "insert_entry",
                                   ("schedules",
                                    "id, host_id, recipient_id, start_time, end_time, context",
                                   "'S" + str(biggest_entry + 1) + "', '" + host_id + "', '" + recipient_id + "', '" + start_time + "', '" + end_time + "', '" + content + "'"),)
        database.commit()
        return json.dumps("Success")
    else:
        return json.dumps("404")
    

def delete_date_event_service(database, json_object):
    current_time = json_object["date"]

    call_stored_procedure(database,
                          "delete_entries",
                          ("schedules",
                           "end_time < '" + current_time + "'"))
    
    database.commit()

    response = fetch_date_event_service(database, json_object)

    return response