import { useEffect } from "react";
import './not-found.css';
export default function NotFound(){
    useEffect(() => {
            document.title = 'Not Found ! - Instagram';
        }, []);
    return (        
        <div>
        <h1>404</h1>
            <p>Oops! Something is wrong.</p>
</div>
    );
}