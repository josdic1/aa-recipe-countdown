import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeContext } from "../context-providers/RecipeContext";

function RecipeForm() {
    const { createRecipe, categories } = useContext(RecipeContext);
    const navigate = useNavigate();
    const [ formData, setFormData ] = useState({
        name: '',
        category_id: '',
    })
    
    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,

        })
    }
 async function onSubmit(e) {
    e.preventDefault()
    await createRecipe(formData.name, formData.category_id)
    navigate('/')
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
                <button type="submit">Create Recipe </button>
            </form>
        </>
    )
}

export default RecipeForm