import React, { useState, useContext } from "react";
import styles from "./css/Login.module.css";
import AuthHeader from "../components/UI/AuthHeader";
import axios from "axios";
import { authContext } from "../context/AuthProvider";
import { useHistory } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { setUserDetails } = useContext(authContext);

    const history = useHistory();

    const onEmailInputChangeHandler = (event) => {
        setEmail(event.target.value);
        setError(false);
    };

    const onPasswordInputChangeHandler = (event) => {
        setPassword(event.target.value);
        setError(false);
    };

    const onFormSubmitHandler = (event) => {
        event.preventDefault();

        const options = {
            method: "POST",
            url: "http://localhost:4000/api/signin",
            data: { email, password },

            credentials: "include",
        };

        axios
            .request(options)
            .then((response) => {
                localStorage.setItem("firstName", response.data.user.firstName);
                localStorage.setItem("lastName", response.data.user.lastName);
                localStorage.setItem("email", response.data.user.email);
                localStorage.setItem("token", response.data.token);
                history.push("/teacherDashboard");
            })
            .catch((err) => setError(err.response.data.message));
    };

    return (
        <>
            <AuthHeader buttonText="Sign up" buttonRedirectTo="/signup" />
            <form onSubmit={onFormSubmitHandler} encType="multipart/form-data">
                <div className={styles.container}>
                    <div>
                        <p className={styles.title}>Sign in</p>
                    </div>

                    {error ? <p className={styles["error-text"]}>{error}</p> : null}
                    <div className={styles["input-container"]}>
                        <input
                            className={`${styles.input} ${
                                error && styles["error-input"]
                            }`}
                            placeholder="Email"
                            name="email"
                            onChange={onEmailInputChangeHandler}
                            value={email}
                        />

                        <input
                            className={`${styles.input} ${
                                error && styles["error-input"]
                            }`}
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={onPasswordInputChangeHandler}
                            value={password}
                        />
                    </div>
                    <button className={styles.button} type="submit">
                        Sign in
                    </button>
                </div>
            </form>
        </>
    );
};

export default Login;
