import os
from flask import Flask
from flask_session import Session
from flask_cors import CORS
from router import auth_bp, admin_bp
from database_connection import database


app = Flask(__name__)
SECRET_KEY = os.urandom(32)
SESSION_TYPE = 'filesystem'
app.config.from_object(__name__)
Session(app)
CORS(app)

app.config["CORS_HEADERS"] = "Content-Type"
app.config["JSONIFY_PRETTYPRINT_REGULAR"] = True


if __name__ == "__main__":
    try:
        os.system('rm -rf flask_session/*')
        app.register_blueprint(auth_bp)
        app.register_blueprint(admin_bp)
        app.run(host="0.0.0.0")
    finally:
        database.close()