import json
import uuid
from flask import jsonify, session
from database_connection import call_stored_procedure


def get_patient_balance_amount(database):      
    print("In patient_balance_service attempting to fetch balance for user") 
    # Check if  the user has logged in
    if "user" in session:
        userType = session.get("authorizedID")
        if "P" == userType:
            userDbId = session.get("user")
            print("In patient_balance_service fetching balance for user",userDbId) 
            patient_balance = call_stored_procedure(database, "get_patient_balance", (userDbId,))
            print("In patient_balance_service fetch balance for user result:", patient_balance) 
            if patient_balance is not None:
                 # Iterate through the possible list of user
                for balance in patient_balance:
                    accountBalance = balance[0]
                    print("In patient_balance_service account balance is:",accountBalance)
                    return dict(status = "success", accountBalance = accountBalance)
                else:
                    print("In patient_balance_service no balance found for the user",userDbId)
                    return dict(status = "success", accountBalance = 0 )
                    
        else:
            print("In patient_balance_service user not authorized to fetch balance for user") 
            return dict(status = "failure", errorMessage = "User not authorized.")

    else:
        print("In patient_balance_service user not logged in") 
        return dict(status = "failure", errorMessage = "User not logged in.")
    
def get_patient_billing_info(database, userID):
    patient_billings = call_stored_procedure(database, "select_patient_billing_by_user_id", (userID,))
    
    print("Patient billing:", patient_billings)
    
    datas = []
    for patient_billing in patient_billings:
        data = { 
            "id": patient_billing[0],
            "userID": patient_billing[1],
            "chargedAmount": patient_billing[2],
            "amountPaid": patient_billing[3],
            "paymentStatus": patient_billing[4],
            "dueDate": patient_billing[5],
            "paymentDate": patient_billing[6],
            "billDate": patient_billing[7]
        }
        datas.append(data)
  
    return dict(status = "success", data = datas)

