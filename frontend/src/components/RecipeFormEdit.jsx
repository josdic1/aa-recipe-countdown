import { useState, useEffect, useContext } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { RecipeContext } from "../context-providers/RecipeContext";

function RecipeFormEdit() {
    const { recipes, loading, updateRecipe, categories } = useContext(RecipeContext);
    const navigate = useNavigate();
        const { id } = useParams();
    const [ formData, setFormData ] = useState({
        id: '',
        name: '',
        category_id: ''
    })
    

   useEffect(() => {
        if (!loading && recipes.length > 0) {  // ← Wait for recipes to load
            const recipeToEdit = recipes.find(r => r.id === parseInt(id));
            
            if (recipeToEdit) {  // ← Check if found
                setFormData({
                    id: recipeToEdit.id,
                    name: recipeToEdit.name,
                    category_id: recipeToEdit.category.id
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
    
    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
 async function onSubmit(e) {
    e.preventDefault()
    await updateRecipe(id, formData.name, formData.category_id)
    navigate('/')
    setFormData({
        id: '',
        name: '',
        category_id: '',
    })
}
        

    return (
        <>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={onChange} />
                </div>
                <div>
                    <label>Category:</label>
                    <select name="category_id" value={formData.category_id} onChange={onChange}>
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Update Recipe </button>
            </form>
        </>
    )
}

export default RecipeFormEdit