import os
import psycopg2 # Not used as we are using SQLAlchemy
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import inspect
from flask_bcrypt import Bcrypt

# Initialize Flask application and SQLAlchemy
app = Flask(__name__)
CORS(app)

""" def get_db_connection():
    conn = psycopg2.connect(
        host=os.getenv('POSTGRES_HOST'),
        database=os.getenv('POSTGRES_DB'),
        user=os.getenv('POSTGRES_USER'),
        password=os.getenv('POSTGRES_PASSWORD')
    )
    return conn """

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{os.getenv("POSTGRES_USER")}:{os.getenv("POSTGRES_PASSWORD")}@db/{os.getenv("POSTGRES_DB")}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # Disable the feature of flask_sqlalchemy that signals the application everytime a change is about to be made in the database

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)


# ----------------------------------------------
# Models 
# ----------------------------------------------
# Users
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)

# Items    
class Item(db.Model):
    __tablename__ = 'items'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    
     
# Function to check if a table exists
def table_exists(table_name):
    inspector = inspect(db.engine)
    return inspector.has_table(table_name)


# Create the database and the table
@app.before_first_request
def create_tables():
    
    # Check if the table exists and truncate it if it does
    if table_exists('items'):
        try:
            db.session.execute('TRUNCATE TABLE items RESTART IDENTITY CASCADE;')
            db.session.commit()
            print("Table 'items' truncated successfully.")
        except Exception as e:
            db.session.rollback()
            print(f"Error truncating table: {e}")
    
    # Create the tables only if it doesn't exist
    db.create_all()


# ----------------------------------------------
# Routes 
# ----------------------------------------------
# Check if Flask is working
@app.route('/api/check')
def check():
    return jsonify(message="Hello from Flask backend!")

# Users Login & Registeration Route
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully!"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        return jsonify({"message": "Login successful!"}), 200
    return jsonify({"message": "Invalid username or password!"}), 401

@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user:
        hashed_password = bcrypt.generate_password_hash(data['new_password']).decode('utf-8')
        user.password = hashed_password
        db.session.commit()
        return jsonify({"message": "Password updated successfully!"}), 200
    return jsonify({"message": "User not found!"}), 404

#Items CRUD Route
@app.route('/items', methods=['GET'])
def get_items():
    items = Item.query.all()
    return jsonify([[item.id, item.name] for item in items])
    
@app.route('/items', methods=['POST'])
def create_item():
    new_item = request.json['name']
    item = Item(name=new_item)
    db.session.add(item)
    db.session.commit()
    return jsonify({"message": "Item created"}), 201

@app.route('/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    item = Item.query.get(item_id)
    if not item:
        return jsonify({"message": "Item not found"}), 404
    else:
        updated_item = request.json['name']
        item.name = updated_item
        db.session.commit()
        return jsonify({"message": "Item updated"})
    
@app.route('/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    item = Item.query.get(item_id)
    if not item:
        return jsonify({"message": "Item not found"}), 404
    else:
        db.session.delete(item)
        db.session.commit()
        return jsonify({"message": "Item deleted"})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
    
    
""" # Example routes for CRUD operations
@app.route('/items', methods=['GET'])
def get_items():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM items;')
    items = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(items)

@app.route('/items', methods=['POST'])
def create_item():
    conn = get_db_connection()
    cur = conn.cursor()
    new_item = request.json['name']
    cur.execute('INSERT INTO items (name) VALUES (%s)', (new_item,))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({'message': 'Item created!'}), 201

@app.route('/items/<int:id>', methods=['PUT'])
def update_item(id):
    conn = get_db_connection()
    cur = conn.cursor()
    updated_item = request.json['name']
    cur.execute('UPDATE items SET name = %s WHERE id = %s', (updated_item, id))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({'message': 'Item updated!'})

@app.route('/items/<int:id>', methods=['DELETE'])
def delete_item(id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM items WHERE id = %s', (id,))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({'message': 'Item deleted!'}) """
