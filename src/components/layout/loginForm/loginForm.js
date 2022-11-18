import { Link } from "react-router-dom";
import { CustomButton } from "../../basic/btn/btn";
import { CustomInput } from "../../basic/input/input";
import styles from "./loginForm.module.css"


export function LoginForm() {
    return (
        <form className={`${styles["loginWrapper"]} d-flex flex-column justify-content-center p-5`}>
            <div className={`d-flex flex-column ${styles["formInputs"]}`}>
                <CustomInput type={"text"} hint={"Username"} />
                <CustomInput type={"password"} hint={"Password"}/>
            </div>
            <div className="d-flex flex-row justify-content-center mt-5">
                <Link to="/home">
                    <CustomButton title={"Login"} styleClass={"buttonPrimary"} />
                </Link>
            </div>
        </form>
    );
}