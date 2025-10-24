import { useContext, useState } from "react";
import { RecipeContext } from "../context-providers/RecipeContext"; 

function HomePage() {
    const { recipes, categories, currentUser, loading } = useContext(RecipeContext);
    const [selectedCategory, setSelectedCategory] = useState(null);
    
    if (loading) {
        return <h1>Loading...</h1>;
    }
    
    // Filter recipes by selected category
    const displayedRecipes = selectedCategory 
        ? recipes.filter(r => r.category?.id === selectedCategory)
        : recipes;
    
    return (
        <>
            <h1>Homepage</h1>
            <p>Logged in as: {currentUser}</p>
            
            <h2>My Categories:</h2>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button 
                    onClick={() => setSelectedCategory(null)}
                    style={{ 
                        padding: '10px 20px',
                        background: selectedCategory === null ? '#4CAF50' : '#ddd'
                    }}
                >
                    Show All
                </button>
                {categories.map(cat => (
                    <button 
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        style={{ 
                            padding: '10px 20px',
                            background: selectedCategory === cat.id ? '#4CAF50' : '#ddd'
                        }}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            <h2>Recipes {selectedCategory ? `in ${categories.find(c => c.id === selectedCategory)?.name}` : ''}</h2>
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
    {displayedRecipes.map(r => (
        <div key={r.id} style={{ 
            border: '1px solid #ddd', 
            padding: '20px', 
            borderRadius: '8px' 
        }}>
            <h3>{r.name}</h3>
            <p>Category: {r.category?.name || 'Unknown'}</p>
            <p>By: {r.user?.name || 'Unknown'}</p>
        </div>
    ))}
</div>
        </>
    );
}

export default HomePage;