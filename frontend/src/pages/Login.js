import React, { useState } from "react";
import styles from "./css/Login.module.css";
import AuthHeader from "../components/UI/AuthHeader";

const Login = () => {
    const [formDetails, setFormDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const onFormSubmitHandler = (event) => {
        event.preventDefault();
        // const options = {
        //     method: "POST",
        //     url: "http://localhost:4000/api/signup",
        //     data: { firstName },
        // };
        console.log(formDetails);
    };

    return (
        <>
            <AuthHeader buttonText="Sign up" buttonRedirectTo="/signup" />
            <form onSubmit={onFormSubmitHandler} encType="application/json">
                <div className={styles.container}>
                    <div>
                        <p className={styles.title}>Sign in</p>
                    </div>
                    <div className={styles["input-container"]}>
                        <input
                            className={styles.input}
                            type="email"
                            placeholder="Email"
                            name="email"
                        />

                        <input
                            className={styles.input}
                            type="password"
                            placeholder="Password"
                            name="password"
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
