from flask import Flask, request, jsonify, session
from flask_cors import CORS
from extensions import db, bcrypt
from schemas import ma, UserSchema, CategorySchema, RecipeSchema
from models import User, Category, Recipe

app = Flask(__name__)

# CORS Configuration
CORS(app, 
     supports_credentials=True, 
     origins=['http://localhost:5173'],
     allow_headers=['Content-Type'],
     methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])

# App Configuration
app.config['SECRET_KEY'] = 'your-secret-key-change-this'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db.init_app(app)
bcrypt.init_app(app)
ma.init_app(app)

### ============= USER ROUTES =============== ###

# CHECK SESSION #
@app.route('/session', methods=['GET'])
def check_session():
    if 'user_id' in session:
        user = db.session.get(User, session['user_id'])
        if user:
            user_schema = UserSchema()
            return jsonify({
                "logged_in": True,
                "user": user_schema.dump(user)
            }), 200
        else:
            session.pop('user_id', None)
    return jsonify({"logged_in": False}), 200

# LOGIN USER #
@app.route('/login', methods=['POST'])
def login_user():   
    data = request.get_json()
    user = User.query.filter_by(name=data['name']).first()
    if user and user.check_password(data['password']):
        session['user_id'] = user.id
        return jsonify({'message': 'Login successful'}), 200
    return jsonify({'message': 'Invalid credentials'}), 401

# LOGOUT #
@app.route('/logout', methods=['POST'])
def logout_user():
    session.pop('user_id', None)
    return jsonify({'message': 'Logout successful'}), 200

# CREATE USER (REGISTER) #
@app.route('/users', methods=['POST'])
def create_user():  
    data = request.get_json()
    user = User(name=data['name'])
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    session['user_id'] = user.id  # Auto-login after register
    return jsonify({'message': 'User created successfully'}), 201

# GET USERS #
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    user_schema = UserSchema(many=True)
    return jsonify(user_schema.dump(users)), 200

# GET USER BY ID #
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):  
    user = db.session.get(User, user_id)
    user_schema = UserSchema()
    return jsonify(user_schema.dump(user)), 200


### ============= CATEGORY ROUTES =============== ###

# GET CATEGORIES #
@app.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    category_schema = CategorySchema(many=True)
    return jsonify(category_schema.dump(categories)), 200

# GET CATEGORY BY ID #
@app.route('/categories/<int:category_id>', methods=['GET'])
def get_category(category_id):  
    category = db.session.get(Category, category_id)
    category_schema = CategorySchema()
    return jsonify(category_schema.dump(category)), 200 

# CREATE CATEGORY #
@app.route('/categories', methods=['POST'])
def create_category():  
    data = request.get_json()
    category = Category(name=data['name'])
    db.session.add(category)
    db.session.commit()
    return jsonify({'message': 'Category created successfully'}), 201


### ============= RECIPE ROUTES =============== ###


# GET RECIPES #
@app.route('/recipes', methods=['GET'])
def get_recipes():  
    recipes = Recipe.query.all()
    recipe_schema = RecipeSchema(many=True)
    return jsonify(recipe_schema.dump(recipes)), 200    

# GET MYRECIPES #
@app.route('/my-recipes', methods=['GET'])
def get_my_recipes():
    if 'user_id' not in session:
        return jsonify({'message': 'Not logged in'}), 401
    
    recipes = Recipe.query.filter_by(user_id=session['user_id']).all()
    recipe_schema = RecipeSchema(many=True)
    return jsonify(recipe_schema.dump(recipes)), 200

# GET RECIPE BY ID #
@app.route('/recipes/<int:recipe_id>', methods=['GET'])
def get_recipe(recipe_id):  
    recipe = db.session.get(Recipe, recipe_id)
    recipe_schema = RecipeSchema()
    return jsonify(recipe_schema.dump(recipe)), 200

# CREATE RECIPE #
@app.route('/recipes', methods=['POST'])
def create_recipe():        
    data = request.get_json()
    recipe = Recipe(name=data['name'], user_id=data['user_id'], category_id=data['category_id'])
    db.session.add(recipe)
    db.session.commit()
    return jsonify({'message': 'Recipe created successfully'}), 201

# UPDATE RECIPE #
@app.route('/recipes/<int:recipe_id>', methods=['PUT'])
def update_recipe(recipe_id):    
    recipe = db.session.get(Recipe, recipe_id)
    data = request.get_json()
    recipe.name = data['name']
    recipe.user_id = data['user_id']
    recipe.category_id = data['category_id']
    db.session.commit()
    return jsonify({'message': 'Recipe updated successfully'}), 200 

# DELETE RECIPE #
@app.route('/recipes/<int:recipe_id>', methods=['DELETE'])
def delete_recipe(recipe_id):        
    recipe = db.session.get(Recipe, recipe_id)
    db.session.delete(recipe)
    db.session.commit() 
    return jsonify({'message': 'Recipe deleted successfully'}), 200     


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(port=5555, debug=True)