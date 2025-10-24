import { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";

export const RecipeContext = createContext();

function RecipeProvider({ children }) {

    const [recipes, setRecipes] = useState([])
    const [category, setCategories] = useState([])

     useEffect(() => {
        axios.get('/api/recipes')
            .then(res => setRecipes(res.data))
            .catch(err => console.log(err)) 
    }, [])

    const recipeMemo = useMemo(() => ({
        recipes,
        setRecipes
    }), [recipes, setRecipes])

    return (

<RecipeContext.Provider
    value={recipeMemo}> 
    {children}
</RecipeContext.Provider>)
}

export default RecipeProvider