import { useContext } from "react";
import { RecipeContext } from "../context-providers/RecipeContext"

function CategoryPage() {
    const { categories } = useContext(RecipeContext);

return (
<>
<h1>Category Page</h1>

</>
)}

export default CategoryPage
