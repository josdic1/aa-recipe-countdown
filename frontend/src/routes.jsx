
import App from "./App";
import CategoryPage from "./pages/CategoryPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RecipeForm from "./components/RecipeForm";
import RecipeFormEdit from "./components/RecipeFormEdit";
import RecipePage from "./pages/RecipePage";


const router = [
    {
        path: "/", 
        element: <App /> , 
        errorElement: <ErrorPage />, 
        children: [
            { index: true, element: <HomePage /> },
            { path: "recipes", element: <RecipePage /> },
            { path: "recipes/:id/new", element: <RecipeForm /> },
            { path: "recipes/:id/edit", element: <RecipeFormEdit /> },
            { path: "categories", element: <CategoryPage /> },
            { path: "login", element: <LoginPage /> },
        ]
    },
]

export default router