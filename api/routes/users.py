from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
import bcrypt

from db.models.User import User
from db.models.Admin import Admin
from db.models.Leads import Leads
from db.db import db

users_bp = Blueprint('users', __name__, url_prefix='/users')


@users_bp.route('/', methods=['GET'])
@jwt_required()
def get_users():
    """Get all users - admin only"""
    user_id = get_jwt_identity()
    
    if not Admin.is_admin(user_id):
        return jsonify({'error': 'Unauthorized - admin access required'}), 403
    
    users = User.query.all()
    return jsonify([{
        'id': user.id,
        'email': user.email,
        'name': user.preferred_name,
        'company': user.company,
        'title': user.title,
        'phone': user.phone,
        'status': user.status,
        'isAdmin': Admin.is_admin(user.id),
        'created_at': user.created_at.isoformat() if user.created_at else None,
        'updated_at': user.updated_at.isoformat() if user.updated_at else None,
    } for user in users]), 200


@users_bp.route('/<lead_id>', methods=['POST'])
@jwt_required()
def create_user(lead_id):
    """Create a user from a lead - admin only"""
    user_id = get_jwt_identity()
    
    if not Admin.is_admin(user_id):
        return jsonify({'error': 'Unauthorized - admin access required'}), 403
    
    lead = Leads.query.get(lead_id)
    if not lead:
        return jsonify({'error': 'Lead not found'}), 404
    
    # Check if user already exists with this email
    existing_user = User.find_by_email(lead.email)
    if existing_user:
        return jsonify({'error': 'User with this email already exists'}), 409
    
    data = request.get_json()
    temp_password = data.get('temp_password')
    
    if not temp_password:
        return jsonify({'error': 'temp_password is required'}), 400
    
    password_hash = bcrypt.hashpw(temp_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    # Create new user from lead data
    new_user = User(
        email=lead.email,
        password_hash=password_hash,
        preferred_name=lead.name,
        company=lead.company,
        title=lead.title,
        phone=lead.phone,
        status='active'
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    # Delete the lead after user is successfully created
    db.session.delete(lead)
    db.session.commit()
    
    return jsonify({
        'id': new_user.id,
        'email': new_user.email,
        'name': new_user.preferred_name,
        'company': new_user.company,
        'title': new_user.title,
        'phone': new_user.phone,
        'status': new_user.status,
        'isAdmin': False,
    }), 201


@users_bp.route('/<user_id>', methods=['PATCH'])
@jwt_required()
def update_user(user_id):
    """Update a user - admin only"""
    current_user_id = get_jwt_identity()
    
    if not Admin.is_admin(current_user_id):
        return jsonify({'error': 'Unauthorized - admin access required'}), 403
    
    user = User.find_by_id(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    data = request.get_json()
    
    # Update allowed fields
    if 'preferred_name' in data:
        user.preferred_name = data['preferred_name']
    if 'company' in data:
        user.company = data['company']
    if 'title' in data:
        user.title = data['title']
    if 'phone' in data:
        user.phone = data['phone']
    if 'status' in data:
        user.status = data['status']
    
    db.session.commit()
    
    return jsonify({
        'id': user.id,
        'email': user.email,
        'name': user.preferred_name,
        'company': user.company,
        'title': user.title,
        'phone': user.phone,
        'status': user.status,
        'isAdmin': Admin.is_admin(user.id),
        'created_at': user.created_at.isoformat() if user.created_at else None,
        'updated_at': user.updated_at.isoformat() if user.updated_at else None,
    }), 200
