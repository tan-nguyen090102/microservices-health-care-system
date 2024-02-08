import os
from flask import Flask
from flask_session import Session
from flask_cors import CORS
from authentication import auth_bp

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
        app.register_blueprint(auth_bp)
        app.run()
    finally:
        pass