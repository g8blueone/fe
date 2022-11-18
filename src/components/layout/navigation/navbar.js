import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/svg/infinity-solid.svg"
import logout from "../../../assets/svg/right-from-bracket-solid.svg"
import styles from "./navbar.module.css"


export function NavBar() {
    const [selected, setSelected] = useState("");


    return (
        <nav className={`d-flex flex-row p-2 ${styles["nav"]}`}>
            <div className="col-1">
                <img src={logo} alt="logo" className="h-100"></img>
            </div>
            <ul className={`${styles["navbtnlist"]} d-flex flex-row h-100 col-10 justify-content-center`}>
                <Link
                    style={{ textDecoration: 'none', color: '#ffffff' }}
                    onClick={() =>
                        setSelected("home")
                    }
                    to="/home"
                    className={`p-3 ${selected === "home" ? styles["navBtn"] : ''}`}>
                    <li className="h-100 d-flex flex-row justify-content-center align-items-center">
                        <h3>Home</h3>
                    </li>
                </Link>
                <Link
                    style={{ textDecoration: 'none', color: '#ffffff' }}
                    onClick={() =>
                        setSelected("appointments")
                    }
                    to="/appointments"
                    className={`p-3 ${selected === "appointments" ? styles["navBtn"] : ''}`}>
                    <li className="h-100 d-flex flex-row justify-content-center align-items-center">
                        <h3>Appointments</h3>
                    </li>
                </Link>
                <Link
                    style={{ textDecoration: 'none', color: '#ffffff' }}
                    onClick={() =>
                        setSelected("doctors")
                    }
                    to="/doctors"
                    className={`p-3 ${selected === "doctors" ? styles["navBtn"] : ''}`}>
                    <li className="h-100 d-flex flex-row justify-content-center align-items-center">
                        <h3>Doctors</h3>
                    </li>
                </Link>
            </ul>
            <div className={`col-1 d-flex justify-content-end`}>
                <Link>
                    <img src={logout} alt="logout" className={`h-100 p-3 ${styles["logout"]}`}></img>
                </Link>
            </div>
        </nav>
    );
}