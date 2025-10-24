import { useContext } from "react";
import { RecipeContext } from "../context-providers/RecipeContext"

function CategoryPage() {
    const { categories, deleteCategory } = useContext(RecipeContext);



const categoriesList = categories.map((category) => (
    <li key={category.id}>{category.name}<button type='button' onClick={() => deleteCategory(parseInt(category.id))}>Delete</button></li>
  ));

return (
<>
<h1>Category Page</h1>
{categoriesList}
</>
)}

export default CategoryPage
