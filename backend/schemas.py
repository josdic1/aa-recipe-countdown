from flask_marshmallow import Marshmallow
from marshmallow import fields

ma = Marshmallow()

class UserSchema(ma.Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    recipes = fields.Nested('RecipeSchema', many=True, only=('id', 'name', 'category', 'user'))

class CategorySchema(ma.Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    recipes = fields.Nested('RecipeSchema', many=True, only=('id', 'name', 'user'))

class RecipeSchema(ma.Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    user_id = fields.Int()
    category_id = fields.Int()
    user = fields.Nested(UserSchema, only=('id', 'name'))
    category = fields.Nested(CategorySchema, only=('id', 'name'))