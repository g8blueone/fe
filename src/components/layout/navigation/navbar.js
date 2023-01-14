import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/svg/infinity-solid.svg"
import logout from "../../../assets/svg/right-from-bracket-solid.svg"
import styles from "./navbar.module.css"

export const NavData = [
    {
        title: "Home",
        path: "/home",
    },
    {
        title: "Appointments",
        path: "/appointments",
    },
    {
        title: "Doctors",
        path: "/doctors",
    },
]

export function NavBar() {

    return (
        <nav className={`d-flex flex-row p-2 ${styles["nav"]}`}>
            <div className="col-1">
                <img src={logo} alt="logo" className="h-100 p-2"></img>
            </div>
            <ul className={`${styles["navbtnlist"]} d-flex flex-row h-100 col-10 justify-content-center`}>
                {
                    NavData?.map((navElem, index) => {
                        return (
                            <li key={index} className="h-100 m-0 d-flex flex-row justify-content-center align-items-center">
                                <NavLink to={navElem.path}
                                    className={({ isActive }) =>
                                        isActive ? styles["navBtn"] : ""
                                    }
                                >
                                    <h5 className={`${styles["navbtnlist"]} m-0`}>
                                        {navElem.title}
                                    </h5>
                                </NavLink>
                            </li>
                        )
                    })
                }
            </ul>
            <div className={`col-1 d-flex justify-content-end`}>
                <Link to={"/"}>
                    <img src={logout} alt="logout" className={`h-100 p-3 ${styles["logout"]}`}></img>
                </Link>
            </div>
        </nav>
    );
}