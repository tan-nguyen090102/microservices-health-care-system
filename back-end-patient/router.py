#make changes
from flask import Blueprint, jsonify, request, session
from flask_cors import cross_origin
from database_connection import database
from signup_patient import user_signup_service

auth_bp = Blueprint("auth_bp", __name__)

@auth_bp.route("/cas-signup", methods = ["GET", "POST"])
@cross_origin(supports_credentials=True)
def signup(database = database):      
    if request.method == "POST":
        json_object = request.json
        if "userID" in json_object:
            response = user_signup_service(database=database, json_object=json_object)

    return response

        
