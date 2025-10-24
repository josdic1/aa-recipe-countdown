import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeContext } from "../context-providers/RecipeContext";
import { useFormik } from 'formik';

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

const formik = useFormik({
    initialValues: {
        name: '',
        category_id: ''
    },
    validate: values => {
        const errors = {};
        
        if (!values.name) {
            errors.name = 'Recipe name is required';
        }
        
        if (!values.category_id) {
            errors.category_id = 'Category is required';
        }
        
        return errors;
    },
    onSubmit: async (values) => {
        await createRecipe(values.name, values.category_id);
        navigate('/');
    }
});



    return (
        <>
            <form onSubmit={formik.handleSubmit}>
        <div>
            <label>Name:</label>
            <input 
                type="text" 
                name="name" 
                value={formik.values.name} 
                onChange={formik.handleChange}
                required  // ← Add HTML validation too
            />
            {formik.errors.name && <span style={{color: 'red'}}>{formik.errors.name}</span>}
        </div>
                       <div>
            <label>Category:</label>
            <select 
                name="category_id" 
                value={formik.values.category_id} 
                onChange={formik.handleChange}
                required  // ← Add HTML validation
            >
                <option value="">Select a category</option>
                {updatedCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            {formik.errors.category_id && <span style={{color: 'red'}}>{formik.errors.category_id}</span>}
            <button type="button" onClick={categoryClick}>
                {categoryFormHidden ? 'Add Category' : 'Cancel'}
            </button>
        </div>

        <button type="submit">Create Recipe</button>
    </form>

        </>
    )
}

export default RecipeForm