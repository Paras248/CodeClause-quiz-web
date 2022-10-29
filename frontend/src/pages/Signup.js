import React, { useState } from "react";
import styles from "./css/Signup.module.css";
import AuthHeader from "../components/UI/AuthHeader";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();

    const onFirstNameInputChangeHandler = (event) => {
        setFirstName(event.target.value);
        setError(false);
    };

    const onLastNameInputChangeHandler = (event) => {
        setLastName(event.target.value);
        setError(false);
    };

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

        if (password.trim().length < 6) {
            setError("Password should be at-least 6 characters long");
            return;
        }

        const options = {
            method: "POST",
            url: "http://localhost:4000/api/signup",
            data: { firstName, lastName, email, password },
        };

        axios
            .request(options)
            .then((response) => {
                history.push("/signin");
            })
            .catch((err) => setError(err.response.data.message));
    };

    return (
        <>
            <AuthHeader buttonText="Sign in" buttonRedirectTo="/signin" />
            <form onSubmit={onFormSubmitHandler} encType="application/json">
                <div className={styles.container}>
                    <div>
                        <p className={styles.title}>Sign up for free today</p>
                    </div>

                    {error ? <p className={styles["error-text"]}>{error}</p> : null}
                    <div className={styles["input-container"]}>
                        <input
                            className={`${styles.input} ${
                                error && styles["error-input"]
                            }`}
                            type="text"
                            placeholder="First name"
                            name="firstName"
                            onChange={onFirstNameInputChangeHandler}
                            value={firstName}
                        />
                        <input
                            className={`${styles.input} ${
                                error && styles["error-input"]
                            }`}
                            type="text"
                            placeholder="Last name"
                            name="lastName"
                            onChange={onLastNameInputChangeHandler}
                            value={lastName}
                        />
                        <input
                            className={`${styles.input} ${
                                error && styles["error-input"]
                            }`}
                            type="email"
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
                        Sign up
                    </button>
                </div>
            </form>
        </>
    );
};

export default Signup;
