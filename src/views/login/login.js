import { Link } from "react-router-dom";

export function Login() {

    return (
        <Link to="/home">
            <button class="btn btn-danger" >
                LOGIN
            </button>
        </Link>
    );
}