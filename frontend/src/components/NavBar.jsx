import { NavLink } from "react-router-dom";
import { Home, Utensils, Users, LogOut } from 'lucide-react';
function NavBar() {
    return (
        <>
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
        <button onClick={() => localStorage.clear()} style={{ marginLeft: 'auto', color: 'white', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <LogOut size={20} />
          Logout
        </button>
      </nav>
        </>
    );
};

export default NavBar;