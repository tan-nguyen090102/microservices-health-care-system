import json
from flask import Blueprint, jsonify, request, session, abort
from flask_cors import cross_origin
from database_connection import database
from authentication import url_login_service, user_login_service, logout_service, default_service, user_login_change_pw_service, user_login_forgot_pw_service, validate_change_pw_input
from admin import delete_noti_service, request_noti_service, request_user_service, delete_user_service, insert_user_service
from schedule import fetch_date_event_service, insert_date_event_service, delete_date_event_service
from signup_patient import user_signup_service


auth_bp = Blueprint("auth_bp", __name__)
admin_bp = Blueprint("admin_bp", __name__)
schedule_bp = Blueprint("schedule_bp", __name__)

@auth_bp.route("/", methods = ["GET", "POST"])
@cross_origin(supports_credentials=True)
def default():
    response = default_service()
    return response

@auth_bp.route("/cas-login", methods = ["GET", "POST"])
@cross_origin(supports_credentials=True)
def login(database = database):      
    if request.method == "POST":
        json_object = request.json
        if "url" in json_object:
            response = url_login_service(json_object=json_object)
        elif "userID" in json_object:
            response = user_login_service(database=database, json_object=json_object)
        else:
            response = default_service()

    return response


@auth_bp.route("/cas-logout", methods = ["GET", "POST"])
@cross_origin(supports_credentials=True)
def logout():
    if request.method == "POST":
        response = logout_service()
        return response
        
@admin_bp.route("/noti", methods = ["GET", "POST"])
@cross_origin(supports_credentials=True)
def deleteNoti():
    if request.method == "POST":
        json_object = request.json
        if "notiID" in json_object and "requestCode" in json_object:
            response = delete_noti_service(database, json_object)
        if "requestCode" in json_object and "notiID" not in json_object:
            response = request_noti_service(database, json_object)
        return response
    

@admin_bp.route("/user-list", methods = ["GET", "POST"])
@cross_origin(supports_credentials=True)
def get_user_list():
    if request.method == "POST":
        json_object = request.json
        if "userID" in json_object and "requestCode" in json_object:
            response = delete_user_service(database, json_object)
        if "requestCode" in json_object and "userID" not in json_object:
            response = request_user_service(database, json_object)
        if "firstName" in json_object:
            response = insert_user_service(database, json_object)
        return response


@auth_bp.route("/cas-forgot-pw", methods = ["POST"])
@cross_origin(supports_credentials=True)
def forgotPassword(database = database):      
    json_object = request.json
    if "userID" in json_object:
        result = user_login_forgot_pw_service(database=database, json_object=json_object)
        return json.dumps(result)
    else:
        #abort(400, description="Invalid input, please populate userid")
        response = dict(status = "failure", errorMessage = "Invalid input, please populate userid")
        return json.dumps(response)


@auth_bp.route("/cas-change-pw", methods = ["POST"])
@cross_origin(supports_credentials=True)
def ChangePw(database = database):      
    json_object = request.json
    print("In router ChangePw method", json_object)
    validationResponse = validate_change_pw_input(json_object)
    if validationResponse["status"] == "failure":
        return json.dumps(validationResponse)
    result = user_login_change_pw_service(database=database, json_object=json_object)
    return json.dumps(result)


@schedule_bp.route("/schedule", methods = ["POST"])
@cross_origin(supports_credentials=True)
def scheduler(database = database):
    json_object = request.json
    if "userID" in json_object and "startTime" in json_object:
        response = fetch_date_event_service(database, json_object)
    if "recipientName" in json_object:
        response = insert_date_event_service(database, json_object)
    if "date" in json_object:
        response = delete_date_event_service(database, json_object)
    return response

def signup():
    if request.method == "POST":
        json_object = request.json
        if "email" in json_object:
            response = user_signup_service(database=database, json_object=json_object)
            return jsonify(response)