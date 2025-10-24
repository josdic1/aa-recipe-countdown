import { useContext } from "react";
import { RecipeContext } from "../providers/RecipeProvider"; 

function HomePage() {

  
    const { recipes } = useContext(RecipeContext);
    return (
        <>
            <h1>Homepage</h1>
       
            <p>{recipes.length}</p>
        </>
    );
}

export default HomePage;