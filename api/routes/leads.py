from flask import Blueprint, jsonify, request

from db.models.Leads import Leads

leads_bp = Blueprint('leads', __name__, url_prefix='/leads')

@leads_bp.route('/', methods=['GET'])
def get_leads():
    leads = Leads.get_all()
    return jsonify([lead.__dict__ for lead in leads]), 200

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