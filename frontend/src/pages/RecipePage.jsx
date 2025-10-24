import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeContext } from "../context-providers/RecipeContext"
import RecipeForm from "../components/RecipeForm";

function RecipePage() {
    const { recipes } = useContext(RecipeContext);



return (
<>
<h1>Recipe Page</h1>
<RecipeForm />
</>
)}

export default RecipePage
