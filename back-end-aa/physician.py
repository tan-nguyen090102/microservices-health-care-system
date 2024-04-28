import json
from flask import jsonify, session
from database_connection import call_stored_procedure

def default_service():
    return json.dumps(["False"])


def request_physician_patient_service(database, json_object):
    physicianID = json_object["userID"]

    get_patients = call_stored_procedure(database,"select_physician_patient", (physicianID,),)

    if get_patients is not None:
        list_of_patient = []
        for patient in get_patients:
            list_of_patient.append([patient[0], patient[1], patient[2], patient[3], patient[5], patient[6], patient[7]])
        return json.dumps(list_of_patient)
    else:
        return json.dumps("False")


def delete_physician_patient_service(database, json_object):
    ph_paID = json_object["phpaID"]

    call_stored_procedure(database, "delete_entries", ("physician_patients", 'id = "' + ph_paID + '"',),)
    database.commit()

    response = request_physician_patient_service(database, json_object)

    return response


def insert_physician_patient_service(database, json_object):
    physician_id = json_object["userID"]
    request_code = json_object["requestPatientCode"]
    content = json_object["content"]
    patient_name = str(json_object["patientName"]).split(" ")

    # Check user is a patient
    try:
        get_user = call_stored_procedure(database,
                                      "select_from_table_with_condition",
                                      ("*",
                                       "users",
                                       "first_name = '" + patient_name[0] + "' AND last_name = '" + patient_name[1] + "' AND authorization_code = '" + request_code + "'"))
    except IndexError:
        return json.dumps("404")
    
    if get_user is not None:
        patient_id = get_user[0][0]

        # Check the latest entry
        get_occurences = call_stored_procedure(database,"select_all_from_table", ("physician_patients",),)

        if get_occurences is not None:
            biggest_entry = 0
            for entries in get_occurences:
                id = int([*(entries[0])][4])

                if (biggest_entry < id):
                    biggest_entry = id
        else:
            biggest_entry = 1

        result = call_stored_procedure(database,
                                   "insert_entry",
                                   ("physician_patients",
                                    "id, physician_id, patient_id, content",
                                   "'PHPA" + str(biggest_entry + 1) + "', '" + physician_id + "', '" + patient_id + "', '" + content + "'"),)
        database.commit()
        
        return json.dumps("Success")
    else:
        return json.dumps("404")
    
    
        

