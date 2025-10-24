import { useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Utensils, Users, LogOut } from 'lucide-react';
import { RecipeContext } from "../context-providers/RecipeContext";

function NavBar() {
    const navigate = useNavigate();
    const { currentUser, loggedIn, logout, loading } = useContext(RecipeContext);
    
    useEffect(() => {
        // Wait for loading to finish before checking
        if (!loading && !loggedIn) {
            navigate('/login');
        }
    }, [loggedIn, loading, navigate]);

    // Don't render navbar while checking session
    if (loading) {
        return null;
    }

    // Don't render navbar if not logged in
    if (!loggedIn) {
        return null;
    }

    return (
        <nav style={{ display: 'flex', gap: '20px', padding: '20px', background: '#333' }}>
            <NavLink to="/" style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Home size={20} />
                Home
            </NavLink>
            <NavLink to="/recipes" style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Utensils size={20} />
                Recipes
            </NavLink>
            <NavLink to="/categories" style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Users size={20} />
                Categories
            </NavLink>
            <button onClick={logout} style={{ marginLeft: 'auto', color: 'white', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <LogOut size={20} />
                Logout
            </button>
        </nav>
    );
}

export default NavBar;