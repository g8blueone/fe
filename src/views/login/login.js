import { LoginForm } from "../../components/layout/loginForm/loginForm";
import styles from "./login.module.css"

export function Login() {

    return (
        <div className={`d-flex flex-row align-content-stretch justify-content-center ${styles["sefuMare"]}`}>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <LoginForm />
            </div>
        </div>
    );
}