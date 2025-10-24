
import App from "./App";
import CategoryPage from "./pages/CategoryPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RecipePage from "./pages/RecipePage";


const router = [
    {
        path: "/", 
        element: <App /> , 
        errorElement: <ErrorPage />, 
        children: [
            { index: true, element: <HomePage /> },
            { path: "recipes", element: <RecipePage /> },
            { path: "categories", element: <CategoryPage /> },
            { path: "login", element: <LoginPage /> },
        ]
    },
]

export default router