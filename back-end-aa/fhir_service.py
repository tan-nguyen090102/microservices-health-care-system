import json
from flask import jsonify, session
from database_connection import call_stored_procedure

def default_service():
    return json.dumps(["False"])

def request_fhir_patient_service(database, json_object):
    patientID = json_object["patientID"]

    get_patients = call_stored_procedure(database,"get_patient_info_by_id", (patientID,),)

    if get_patients is not None:
        list_of_patient = []
        for patient in get_patients:
            list_of_patient.append({
            "fullName": patient[0],
            "userID": patient[1],
            "age": patient[2],
            "dob": patient[3],
            "phone": patient[4],
            "address": patient[5],
            "gender": patient[6],
            "medications": patient[7],
            "familyHistory": patient[8],
            "patientHistory": patient[9]
        })
        return json.dumps(list_of_patient, indent=4)
    else:
        return json.dumps("False")


