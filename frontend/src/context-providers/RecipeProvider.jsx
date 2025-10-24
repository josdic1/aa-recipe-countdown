import { useState, useEffect, useMemo } from "react";
import { RecipeContext } from "./RecipeContext";
import * as api from "../api/api";



function RecipeProvider({ children }) {

const [recipes, setRecipes] = useState([]);
const [categories, setCategories] = useState([]);
const [currentUser, setCurrentUser] = useState(null);
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
            setCurrentUser(res.data.user.name);
            setRecipes(res.data.user.recipes);
            await fetchCategories();
            console.log('User logged in');
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

    // ============= CATEGORIES ===============
    const fetchCategories = async () => {
        try {
            const res = await api.getCategories();
            setCategories(res.data);
        } catch (err) {
            console.error('Fetch categories failed:', err);
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
        setCurrentUser(null);
        setRecipes([]);
        setCategories([]);
        return { success: true };
    } catch (err) {
        return { success: false, message: err.response?.data?.message || 'Logout failed' };
    }
};  

    const contextValue = useMemo(() => ({
    recipes,
    categories,
    currentUser,
    loggedIn: !!currentUser,  
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