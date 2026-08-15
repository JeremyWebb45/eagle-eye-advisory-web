from flask import Blueprint, jsonify, send_from_directory
from flask_jwt_extended import jwt_required, get_jwt_identity
import os

files_bp = Blueprint('files', __name__, url_prefix='/files')

# Whitelist of allowed files that can be served
ALLOWED_FILES = [
    'Eagle Eye Evolution - AUG 4 2026.pdf',
    'EEA - Kinaxis Template AUG 4 - website version.pdf',
    'Executive Summary CV AUG 4 2026.pdf',
    'Skopos CTS Framework - AUG 4 2026.pdf'
]

# Directory where protected files are stored
PROTECTED_FILES_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../protected_files'))


@files_bp.route('/<filename>', methods=['GET'])
@jwt_required()
def get_file(filename):
    # Verify file is in whitelist to prevent directory traversal attacks
    if filename not in ALLOWED_FILES:
        return jsonify({'error': 'File not found'}), 404
    
    file_path = os.path.join(PROTECTED_FILES_DIR, filename)
    
    # Verify file exists
    if not os.path.exists(file_path):
        return jsonify({'error': 'File not found'}), 404
    
    try:
        return send_from_directory(PROTECTED_FILES_DIR, filename, as_attachment=False)
    except Exception as e:
        return jsonify({'error': 'Failed to retrieve file'}), 500
