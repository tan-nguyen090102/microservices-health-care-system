from flask import Blueprint, jsonify, request, session
from flask_cors import cross_origin
from database_connection import database
from authentication import url_login_service, user_login_service, logout_service, default_service

auth_bp = Blueprint("auth_bp", __name__)

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
        
