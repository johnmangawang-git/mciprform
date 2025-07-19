import os
import json
import click
from flask import Flask, request, jsonify, session
from flask.cli import with_appcontext
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta

app = Flask(__name__)
# In a real app, use instance-relative config
app.config.from_mapping(
    SECRET_KEY='dev', # Change this in production
    SQLALCHEMY_DATABASE_URI='sqlite:///' + os.path.join(app.instance_path, 'orders.db'),
    SQLALCHEMY_TRACK_MODIFICATIONS=False,
)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"]) 

db = SQLAlchemy(app)

# --- Database Models ---

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(50), nullable=False, default='user')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class PurchaseRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pr_number = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(50), nullable=False)
    time = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    items_json = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('purchase_requests', lazy=True))

class LookupItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item_code = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    uom = db.Column(db.String(50), nullable=False)

# --- Database CLI Commands ---

@click.command('init-db')
@with_appcontext
def init_db_command():
    """Clear the existing data and create new tables."""
    db.create_all()
    # Seed initial users
    if User.query.first() is None:
        print("No users found. Seeding initial users...")
        USERS_INITIAL = [
            { "username": 'admin', "password": 'admin', "role": 'admin' },
            { "username": 'Finance director', "password": 'password', "role": 'user' },
            { "username": 'Gen accounting', "password": 'password', "role": 'user' },
            { "username": 'Treasury', "password": 'password', "role": 'user' },
            { "username": 'Inventory & Cost accounting mngr', "password": 'password', "role": 'user' },
            { "username": 'Revenue Assurance and Collection mngr', "password": 'password', "role": 'user' },
            { "username": 'Purchasing', "password": 'password', "role": 'user' },
            { "username": 'Warehouse & Logistics mngr', "password": 'password', "role": 'user' },
            { "username": 'Biz dev', "password": 'password', "role": 'user' },
            { "username": 'EA', "password": 'password', "role": 'user' },
            { "username": 'IT - SAP', "password": 'password', "role": 'user' },
            { "username": 'FP & A Manager', "password": 'password', "role": 'user' },
            { "username": 'Service', "password": 'password', "role": 'user' },
        ]
        for user_data in USERS_INITIAL:
            new_user = User(username=user_data['username'], role=user_data['role'])
            new_user.set_password(user_data['password'])
            db.session.add(new_user)
        db.session.commit()
        click.echo('Initial users have been seeded.')
    click.echo('Initialized the database.')

app.cli.add_command(init_db_command)

@click.command('reset-passwords')
@with_appcontext
def reset_passwords_command():
    """Resets all non-admin user passwords to 'password'."""
    users = User.query.filter(User.role != 'admin').all()
    for user in users:
        user.set_password('password')
        db.session.add(user)
    db.session.commit()
    click.echo('All non-admin user passwords have been reset to "password".')

app.cli.add_command(reset_passwords_command)

# --- API Endpoints ---
# (The rest of the API endpoints remain the same)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        session['user_id'] = user.id
        session['role'] = user.role
        session['username'] = user.username
        print(f"Session after login: {session}") # Debug print
        return jsonify({'message': 'Login successful', 'user': {'username': user.username, 'role': user.role}}), 200
    
    return jsonify({'error': 'Invalid username or password'}), 401

@app.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'message': 'Logout successful'}), 200

@app.route('/api/session', methods=['GET'])
def get_session():
    if 'user_id' in session:
        return jsonify({'isLoggedIn': True, 'user': {'username': session['username'], 'role': session['role']}}), 200
    return jsonify({'isLoggedIn': False}), 200

@app.route('/api/change_password', methods=['POST'])
def change_password():
    if 'user_id' not in session:
        return jsonify({'error': 'Authentication required'}), 401

    data = request.get_json()
    old_password = data.get('oldPassword')
    new_password = data.get('newPassword')
    confirm_new_password = data.get('confirmNewPassword')

    if not old_password or not new_password or not confirm_new_password:
        return jsonify({'error': 'All fields are required'}), 400

    if new_password != confirm_new_password:
        return jsonify({'error': 'New password and confirmation do not match'}), 400

    if len(new_password) < 6:
        return jsonify({'error': 'New password must be at least 6 characters long'}), 400

    user = User.query.get(session['user_id'])

    if not user or not user.check_password(old_password):
        return jsonify({'error': 'Invalid old password'}), 401

    user.set_password(new_password)
    db.session.commit()

    return jsonify({'message': 'Password changed successfully'}), 200

@app.route('/api/requests', methods=['POST'])
def submit_request():
    if 'user_id' not in session:
        print(f"Submit request: user_id not in session. Current session: {session}") # Debug print
        return jsonify({'error': 'Authentication required'}), 401

    data = request.get_json()
    new_pr = PurchaseRequest(
        pr_number=data['prNumber'],
        date=data['date'],
        time=data['time'],
        status=data['status'],
        items_json=json.dumps(data['items']),
        user_id=session['user_id']
    )
    db.session.add(new_pr)
    db.session.commit()
    print(f"Submit request: user_id {session['user_id']} successfully submitted PR") # Debug print
    return jsonify({'message': 'Purchase Request submitted successfully'}), 201

@app.route('/api/requests', methods=['GET'])
def get_requests():
    if 'user_id' not in session:
        return jsonify({'error': 'Authentication required'}), 401

    # This is a simplified filter. A robust implementation would handle date parsing more carefully.
    # fourteen_days_ago = (datetime.utcnow() - timedelta(days=14))

    if session['role'] == 'admin':
        # Admin sees all requests
        requests_query = PurchaseRequest.query.order_by(PurchaseRequest.date.desc(), PurchaseRequest.time.desc()).all()
    else:
        # Regular user sees only their own requests
        requests_query = PurchaseRequest.query.filter_by(user_id=session['user_id']).order_by(PurchaseRequest.date.desc(), PurchaseRequest.time.desc()).all()
    
    output = []
    for pr in requests_query:
        # Example date filtering (assumes date is in a parseable format like YYYY-MM-DD)
        # pr_date = datetime.strptime(pr.date, '%Y-%m-%d') # Adjust format as needed
        # if pr_date >= fourteen_days_ago:
            output.append({
                'id': pr.id,
                'prNumber': pr.pr_number,
                'date': pr.date,
                'time': pr.time,
                'user': pr.user.username,
                'status': pr.status,
                'items': json.loads(pr.items_json)
            })
    return jsonify(output), 200

@app.route('/api/lookup', methods=['GET'])
def get_lookup_data():
    if 'user_id' not in session:
        return jsonify({'error': 'Authentication required'}), 401
    
    lookup_items = LookupItem.query.all()
    output = {}
    for item in lookup_items:
        output[item.item_code] = {
            'description': item.description,
            'uom': item.uom
        }
    return jsonify(output), 200

@app.route('/api/lookup', methods=['POST'])
def upload_lookup_data():
    if 'user_id' not in session or session['role'] != 'admin':
        print(f"Upload lookup data: user_id not in session or not admin. Current session: {session}") # Debug print
        return jsonify({'error': 'Admin access required'}), 403

    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid JSON data'}), 400

    try:
        LookupItem.query.delete()
        for item_code, item_data in data.items():
            new_item = LookupItem(
                item_code=item_code.lower(),
                description=item_data['description'],
                uom=item_data['uom']
            )
            db.session.add(new_item)
        db.session.commit()
        return jsonify({'message': 'Lookup data uploaded successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

# Ensure the instance folder exists
try:
    os.makedirs(app.instance_path)
except OSError:
    pass

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)
