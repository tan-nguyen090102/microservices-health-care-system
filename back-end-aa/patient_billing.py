import json
import uuid
from flask import jsonify, session
from database_connection import call_stored_procedure


def patient_balance_service(database):      
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
    


