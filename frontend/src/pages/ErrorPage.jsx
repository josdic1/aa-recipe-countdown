import { useRouteError } from "react-router-dom";
import { Home } from 'lucide-react';

function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <a href="/" style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Home size={20} />
          Home
        </a>
        </div>
    );
}   

export default ErrorPage