import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { RecipeContext } from "../context-providers/RecipeContext";

function RecipeCard() {
    const {loading, recipes} = useContext(RecipeContext)

    const { id } = useParams();


    const [ thisRecipe, setThisRecipe ] = useState({
        id: '',
        name: '',
        category_id: '',
        user_id: ''
    })

   useEffect(() => {
        if (!loading && recipes.length > 0) {  // ← Wait for recipes to load
            const recipeToEdit = recipes.find(r => r.id === parseInt(id));
            
            if (recipeToEdit.id) {  // ← Check if found
                setThisRecipe({
                    id: recipeToEdit.id,
                    name: recipeToEdit.name,
                    category_id: recipeToEdit.category.name,
                    user_id: recipeToEdit.user.name
                });
            }
        }
    }, [id, recipes, loading]); 

    // ⭐ LOADING CHECK 
    if (loading) {
        return <h1>Loading...</h1>;
    }

    // ⭐ SECOND CHECK - Wait for recipes to load
    if (!recipes.length) {
        return <h1>No recipes found...</h1>;
    }
    

return (
<>
<div>
    <h1>{thisRecipe.name}</h1>
    <p>{thisRecipe.category_id}</p>
    <p>{thisRecipe.user_id}</p>
    <em>Other fields (i.e. instructions, ingredients, etc.)</em>
</div>
</>
)}

export default RecipeCard
