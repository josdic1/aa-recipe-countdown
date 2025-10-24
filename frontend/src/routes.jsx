
import App from "./App";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";

const router = [
    {
        path: "/", 
        element: <App /> , 
        errorElement: <ErrorPage />, 
        children: [
            { index: true, element: <HomePage /> }
        ]
    },
]

export default router