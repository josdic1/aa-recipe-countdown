import { useState, useEffect, useMemo } from "react";
import { RecipeContext } from "./RecipeContext";
import * as api from "../api/api";



function RecipeProvider({ children }) {

const [recipes, setRecipes] = useState([]);
const [categories, setCategories] = useState([]);
const [currentUser, setCurrentUser] = useState({
    id: null,
    name: null
});
const [loading, setLoading] = useState(true);

const loggedIn = !!currentUser;


// ============= INIT ===============
 useEffect(() => {
        checkUserSession();
    }, []);

    const checkUserSession = async () => {
    try {
        const res = await api.checkSession();

        
        if (res.data.logged_in) {
            setCurrentUser(res.data.user);
            setRecipes(res.data.user.recipes);
            await fetchCategories();

        } else {
            console.log('No user logged in');
        }
    } catch (err) {
        console.error('Session check failed:', err);
    } finally {
        setLoading(false);
    }
};

    // ============= RECIPES ===============
    const fetchRecipes = async () => {
        try {
            const res = await api.getRecipes();
            setRecipes(res.data);
            console.log(recipes)
        } catch (err) {
            console.error('Fetch recipes failed:', err);
        }
    };

  const createRecipe = async (name, category_id) => {
    try {
        await api.createRecipe(name, parseInt(category_id));
        await checkUserSession();  // ← Use this instead of fetchRecipes
        return { success: true };
    } catch (err) {
        return { success: false, message: err.response?.data?.message || 'Create recipe failed' };
    }
};

    const updateRecipe = async (id, name, category_id) => {
        try {
            await api.updateRecipe(parseInt(id), name, parseInt(category_id));
            await checkUserSession();  // ← Use this instead of fetchRecipes
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || 'Update recipe failed' };
        }
    };  

    const deleteRecipe = async (id) => {
        try {
            await api.deleteRecipe(parseInt(id));
            await checkUserSession();  // ← Use this instead of fetchRecipes
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || 'Delete recipe failed' };
        }
    };

    // ============= CATEGORIES ===============
    const fetchCategories = async () => {
        try {
            const res = await api.getCategories();
            setCategories(res.data);
        } catch (err) {
            console.error('Fetch categories failed:', err);
        }
    };

const createCategory = async (name) => {
    try {
        const res = await api.createCategory(name);
        await fetchCategories();
        return res.data;  // ← This IS the new category
    } catch (err) {
        console.error('Create category failed:', err);
        return null;
    }
};

const updateCategory = async (id, name) => {
    try {
        const res = await api.updateCategory(parseInt(id), name);
        await fetchCategories();
        return res.data;  // The API response should have the updated category
    } catch (err) {
        console.error('Update category failed:', err);
        return null;
    }
};  

const deleteCategory = async (id) => {
    try {
        const res = await api.deleteCategory(parseInt(id));
        await fetchCategories();
        return res.data;  // The API response should have the deleted category
    } catch (err) {
        console.error('Delete category failed:', err);
        return null;
    }
};

      // ============= LOGIN / REGISTER / LOGOUT ===============  
    const login = async (name, password) => {
    try {
        await api.login(name, password);
        await checkUserSession();
        return { success: true };
    } catch (err) {
        return { success: false, message: err.response?.data?.message || 'Login failed' };
    }
};

const register = async (name, password) => {
    try {
        await api.register(name, password);
        await checkUserSession();
        return { success: true };
    } catch (err) {
        return { success: false, message: err.response?.data?.message || 'Register failed' };
    }
};

const logout = async () => {
    try {
        await api.logout();
        setCurrentUser({ id: null, name: null });
        setRecipes([]);
        setCategories([]);
        return { success: true };
    } catch (err) {
        return { success: false, message: err.response?.data?.message || 'Logout failed' };
    }
};  

    const contextValue = useMemo(() => ({
    recipes,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    categories,
    createCategory,
    updateCategory,
    deleteCategory,
    currentUser,
    loggedIn: !!currentUser.id,  
    loading,
    login,
    register,
    logout,
    }), [recipes, categories, currentUser, loading])

    return (

<RecipeContext.Provider
    value={contextValue}> 
    {children}
</RecipeContext.Provider>)
}

export default RecipeProvider