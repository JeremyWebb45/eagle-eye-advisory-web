from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from db.models.Leads import Leads
from db.models.Admin import Admin

leads_bp = Blueprint('leads', __name__, url_prefix='/leads')

@leads_bp.route('/', methods=['GET'])
@jwt_required()
def get_leads():
    """Get all leads - admin only"""
    user_id = get_jwt_identity()
    
    if not Admin.is_admin(user_id):
        return jsonify({'error': 'Unauthorized - admin access required'}), 403
    
    leads = Leads.get_all()
    return jsonify([{
        'id': lead.id,
        'name': lead.name,
        'email': lead.email,
        'title': lead.title,
        'phone': lead.phone,
        'company': lead.company,
        'message': lead.message,
        'created_at': lead.created_at.isoformat() if lead.created_at else None,
    } for lead in leads]), 200

@leads_bp.route('/<lead_id>', methods=['DELETE'])
@jwt_required()
def delete_lead(lead_id):
    """Delete a lead - admin only"""
    user_id = get_jwt_identity()
    
    if not Admin.is_admin(user_id):
        return jsonify({'error': 'Unauthorized - admin access required'}), 403
    
    lead = Leads.query.get(lead_id)
    if not lead:
        return jsonify({'error': 'Lead not found'}), 404
    
    Leads.delete(lead_id)
    return jsonify({'message': 'Lead deleted successfully'}), 200

@leads_bp.route('/', methods=['POST'])
def create_lead():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    title = data.get('title')
    phone = data.get('phone')
    company = data.get('company')
    message = data.get('message')

    if not name or not email or not message:
        return jsonify({'error': 'Name, email, and message are required'}), 400

    status_code = Leads.create(name, email, title, phone, company, message)
    return jsonify({'message': 'Lead created successfully'}), status_code