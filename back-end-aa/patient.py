import json
from flask import jsonify, session
from flask_cors import CORS
from database_connection import call_stored_procedure

def insert_patient_info(database, json_object):
  fullName = json_object["fullName"]
  email = json_object["email"]
  age = json_object["age"]
  dob = json_object["dob"]
  phone = json_object["phone"]
  address = json_object["address"]
  gender = json_object["gender"]
  medications = json_object["medications"]
  familyHistory = json_object["familyHistory"]
  patientHistory = json_object["patientHistory"]

  #check if user already exists in the database
  check_user = call_stored_procedure(database, "check_user", (email,))
    
  if check_user:
    get_user_id = call_stored_procedure(database, "get_user_id_by_email", (email,))
    if get_user_id:
      userID = get_user_id[0][0]
      insert_patient_info = call_stored_procedure(database,"insert_patient_info", (fullName, userID, age, dob, phone, address, gender, medications, familyHistory, patientHistory))
      database.commit()
      return jsonify({"status": "Success"})
    else:
      return jsonify({"status": "Error", "Message": "Failed to fetch user ID."})
  else:
    return jsonify({"status": "Error", "Message": "Patient does not exist in database."})



def get_patient_info(database, userID):
    patient_infos = call_stored_procedure(database, "get_patient_info_by_id", (userID,))
    
    print("Patient Info:", patient_infos)
    
    datas = []
    for patient_info in patient_infos:
        data = {
            "fullName": patient_info[0],
            "userID": patient_info[1],
            "age": patient_info[2],
            "dob": patient_info[3],
            "phone": patient_info[4],
            "address": patient_info[5],
            "gender": patient_info[6],
            "medications": patient_info[7],
            "familyHistory": patient_info[8],
            "patientHistory": patient_info[9]
        }
        datas.append(data)
  
    return jsonify(datas)


def get_patient_medication(database, userID):
    patient_meds = call_stored_procedure(database, "get_patient_medication_by_id", (userID,))
    
    print("Patient Medications:", patient_meds)
    
    datas = []
    for patient_med in patient_meds:
        data = {
            "fullName": patient_med[0],
            "userID": patient_med[1],
            "age": patient_med[2],
            "dob": patient_med[3],
            "phone": patient_med[4],
            "address": patient_med[5],
            "gender": patient_med[6],
            "medications": patient_med[7],
            "familyHistory": patient_med[8],
            "patientHistory": patient_med[9]
        }
        datas.append(data)
  
    return jsonify(datas)


def get_patient_visits(database, userID):
    patient_visits = call_stored_procedure(database, "get_patient_visits_by_id", (userID,))
    
    print("Patient Visits:", patient_visits)
    
    datas = []
    for patient_visit in patient_visits:
        data = {
            "id": patient_visit[0],
            "host_id": patient_visit[1],
            "recipient_id": patient_visit[2],
            "start_time": patient_visit[3],
            "end_time": patient_visit[4],
            "context": patient_visit[5]
        }
        datas.append(data)
  
    return jsonify(datas)
