from sqlalchemy.ext.associationproxy import association_proxy
from extensions import db, bcrypt

# USER MODEL #
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    recipes = db.relationship('Recipe', back_populates='user')
    categories = association_proxy('recipes', 'category')

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)
    
    def __repr__(self):
        return '<User %r>' % self.name
    
# CATEGORY MODEL #
class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)

    recipes = db.relationship('Recipe', back_populates='category')
    users = association_proxy('recipes', 'user')

    def __repr__(self):
        return '<Category %r>' % self.name
    
# RECIPE MODEL #
class Recipe(db.Model):
    __tablename__ = 'recipes'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)

    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    category = db.relationship('Category', back_populates='recipes')
    user = db.relationship('User', back_populates='recipes')