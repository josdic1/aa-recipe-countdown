from server import app
from models import User, Category, Recipe
from extensions import db

with app.app_context():
    # Delete existing data
    print("Deleting existing data...")
    Recipe.query.delete()
    Category.query.delete()
    User.query.delete()
    db.session.commit()

    # Create Users
    print("Creating users...")
    josh = User(name="josh")
    josh.set_password("josh")
    
    dor = User(name="dor")
    dor.set_password("dor")
    
    db.session.add_all([josh, dor])
    db.session.commit()

    # Create Categories
    print("Creating categories...")
    like = Category(name="like")
    dislike = Category(name="dislike")
    favorite = Category(name="favorite")
    
    db.session.add_all([like, dislike, favorite])
    db.session.commit()

    # Create Recipes
    print("Creating recipes...")
    recipes = [
        Recipe(name="Blueberry Pancakes", user_id=josh.id, category_id=favorite.id),
        Recipe(name="Cheesesteak", user_id=josh.id, category_id=like.id),
        Recipe(name="Acai Bowl", user_id=josh.id, category_id=favorite.id),
        Recipe(name="Bleu Cheese", user_id=josh.id, category_id=dislike.id),
        Recipe(name="Pizza", user_id=josh.id, category_id=favorite.id),
        Recipe(name="Olives", user_id=dor.id, category_id=favorite.id),
        Recipe(name="Blueberry Pancakes (dor)", user_id=dor.id, category_id=dislike.id),
        Recipe(name="Truffle", user_id=dor.id, category_id=favorite.id),
        Recipe(name="Life Cereal", user_id=dor.id, category_id=like.id),
    ]
    
    db.session.add_all(recipes)
    db.session.commit()

    print("✅ Seed data created successfully!")