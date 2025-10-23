from flask_marshmallow import Marshmallow
from marshmallow import fields

ma = Marshmallow()


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'recipes')
    
    recipes = fields.Nested('RecipeSchema', many=True, only=('id', 'name', 'category'))

class CategorySchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'recipes')
    
    recipes = fields.Nested('RecipeSchema', many=True, only=('id', 'name', 'user'))

class RecipeSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'user_id', 'category_id', 'user', 'category')
    
    user = fields.Nested(UserSchema, only=('id', 'name'))
    category = fields.Nested(CategorySchema, only=('id', 'name'))