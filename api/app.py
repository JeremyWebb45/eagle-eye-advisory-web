from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from db.db import db
from utils.get_env_values import get_env_values

app = Flask(__name__)

# Configure database
env_values = get_env_values()
app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{env_values['POSTGRES_USER']}:{env_values['POSTGRES_PASSWORD']}@{env_values['POSTGRES_HOST']}:{env_values['POSTGRES_PORT']}/{env_values['POSTGRES_DB']}"

# Configure JWT
app.config['JWT_SECRET_KEY'] = env_values['JWT_SECRET_KEY']  # Change this in production
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 3600  # 1 hour
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = 604800  # 7 days

# Configure JWT to use cookies instead of headers
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
is_production = env_values['TIER'] == 'production'
app.config['JWT_COOKIE_SECURE'] = is_production  # HTTPS only in production
app.config['JWT_COOKIE_CSRF_PROTECT'] = False
app.config['JWT_COOKIE_SAMESITE'] = 'Strict' if is_production else 'Lax'

db.init_app(app)
jwt = JWTManager(app)

allowed_origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://eagleeyeadvisory.us.com",
    "https://www.eagleeyeadvisory.us.com"
]
CORS(app, origins=allowed_origins, supports_credentials=True)

# Register blueprints
from routes.auth import auth_bp
app.register_blueprint(auth_bp)

from routes.leads import leads_bp
app.register_blueprint(leads_bp)

if __name__ == '__main__':
    # default host=0.0.0.0 so containers can reach it
    app.run(host='0.0.0.0', port=5001, debug=True)
