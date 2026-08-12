from typing import Optional

from flask import Blueprint, Response, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from db.models.User import User
from db.models.Admin import Admin
import bcrypt

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')


@auth_bp.route('/login', methods=['POST'])
def login():
    """Login endpoint - returns JWT access and refresh tokens."""
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Email and password required'}), 400
    
    email = data.get('email')
    password = data.get('password')
    
    # Find user by email
    user = User.find_by_email(email)
    
    if not user:
        return jsonify({'error': 'Invalid email or password'}), 401
    
    # Verify password against hash
    if not bcrypt.checkpw(password.encode('utf-8'), user.password_hash.encode('utf-8')):
        return jsonify({'error': 'Invalid email or password'}), 401
    
    # Check if user is active
    if user.status != 'active':
        return jsonify({'error': 'User account is not active'}), 403
    
    # Create JWT tokens
    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)
    
    response = jsonify({
        'email': user.email,
        'name': user.preferred_name,
        'company': user.company,
        'title': user.title,
        'phone': user.phone,
        'status': user.status,
        'isAdmin': Admin.is_admin(user.id)
    })

    response.set_cookie('access_token_cookie', access_token, httponly=True, secure=True, samesite='Strict')
    response.set_cookie('refresh_token_cookie', refresh_token, httponly=True, secure=True, samesite='Strict', path='/auth/refresh')
    
    return response


@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    """Refresh endpoint - returns new access token cookie."""
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    
    response = Response(status=200)
    response.set_cookie('access_token_cookie', access_token, httponly=True, secure=True, samesite='Strict')
    
    return response


@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    """Logout endpoint - clears cookies."""
    response = Response(status=200)
    response.delete_cookie('access_token_cookie')
    response.delete_cookie('refresh_token_cookie')
    return response

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def me():
    """Get current user info."""
    identity = get_jwt_identity()
    user = User.find_by_id(identity)
    if not user:
        return jsonify({'error': 'User not found'}, status=404)
    return jsonify({
        'email': user.email,
        'name': user.preferred_name,
        'company': user.company,
        'title': user.title,
        'phone': user.phone,
        'status': user.status,
        'isAdmin': Admin.is_admin(user.id)
    })