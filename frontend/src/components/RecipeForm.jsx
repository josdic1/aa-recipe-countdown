import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeContext } from "../context-providers/RecipeContext";

function RecipeForm() {
    const { createRecipe, createCategory, categories } = useContext(RecipeContext);
    const navigate = useNavigate();
    const [ formData, setFormData ] = useState({
        name: '',
        category_id: '',
    })
    const [ categoryForm, setCategoryForm] = useState({
        name: ''
    })
    const [ updatedCategories, setUpdatedCategories ] = useState([])

    const [ categoryFormHidden, setCategoryFormHidden ] = useState(true)
    

    useEffect(() => {
        if(categories.length <= 0) {
            return 
        } else {
            setUpdatedCategories(categories)
        }
    },[categories])

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,

        })
    }

    const categoryClick = () => {
        setCategoryFormHidden(!categoryFormHidden)
    }

    const onCategoryInput = (e) => {
        const { value } = e.target
        setCategoryForm(prev => ({
            ...prev,
            name: value
        }))
    }


async function onCategorySubmit() {
    const duplicateFound = categories.find(c => 
        c.name.toLowerCase() === categoryForm.name.toLowerCase()
    );
    
    if (duplicateFound) {
        setFormData(prev => ({
            ...prev,
            category_id: duplicateFound.id
        }));
    } else if (categoryForm.name) {
        const newCategory = await createCategory(categoryForm.name);
        console.log('Returned from createCategory:', newCategory.name); // ← Log this
        if (newCategory) {
            setFormData(prev => ({
                ...prev,
                category_id: newCategory.id
            }));
        }
    }
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
                    {categoryFormHidden ? "HIDDEN" : 
                    <div>
                    <input type="text" onChange={onCategoryInput} value={categoryForm.name} placeholder="category name..."/>
                    <button type='button' onClick={onCategorySubmit}> Confirm </button>
                         </div>
                    }
                </div>
                <div>
                    <label>Category:</label>
                    <select name="category_id" value={formData.category_id} onChange={onChange}>
                        <option value="">Select a category</option>
                        {updatedCategories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <button type="button" onClick={categoryClick}>{categoryFormHidden ? 'Add Category' : 'Cancel'}</button>
                </div>
                <button type="submit">Create Recipe </button>
            </form>
        </>
    )
}

export default RecipeForm