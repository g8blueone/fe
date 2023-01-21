import { Link } from "react-router-dom";
import React, { useState } from "react";
import { CustomButton } from "../../basic/btn/btn";
import { CustomInput } from "../../basic/input/input";
import styles from "./loginForm.module.css";
import axios from "axios";
import urlString from "../../../url";

export function LoginForm() {
  const login = async (email, password) => {
    const LOGIN_API = `${urlString}login`;
    const status = await axios
      .post(LOGIN_API, {
        email: email,
        password: password,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        setError(true);
        setErrorMsg(error.response.data);
      });

    return status.data;
  };

  const [showError, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    const response = await login(email, password);
    sessionStorage.setItem("token", response.meta.id);
    sessionStorage.setItem("userType", response.meta.type);
    window.location.href = "/home";
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form
      className={`${styles["loginWrapper"]} d-flex flex-column justify-content-center p-5`}
    >
      <h2
        className={`${styles["rubrica2"]} d-flex flex-row justify-content-center`}
      >
        Login
      </h2>
      <div className={`d-flex flex-column ${styles["formInputs"]}`}>
        <CustomInput
          type={"text"}
          hint={"Username"}
          onChangeHandler={emailHandler}
        />
        <CustomInput
          type={"password"}
          hint={"Password"}
          onChangeHandler={passwordHandler}
        />
      </div>
      {showError && (
        <div className="alert-danger alert mt-3 text-center">{errorMsg}</div>
      )}
      <div className="d-flex flex-row justify-content-center mt-5">
        <CustomButton
          title={"Login"}
          styleClass={"buttonPrimary"}
          handler={loginHandler}
        />
      </div>
    </form>
  );
}
