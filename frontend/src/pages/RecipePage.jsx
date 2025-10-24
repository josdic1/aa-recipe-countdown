import { useContext } from "react";
import { RecipeContext } from "../context-providers/RecipeContext"

function RecipePage() {
    const { recipes } = useContext(RecipeContext);

return (
<>
<h1>Recipe Page</h1>
</>
)}

export default RecipePage
