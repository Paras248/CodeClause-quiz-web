import React from "react";
import styles from "./css/Login.module.css";
import AuthHeader from "../components/UI/AuthHeader";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <>
            <AuthHeader buttonText="Sign up" />
            <form>
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
                    <button className={styles.button}>Sign in</button>
                </div>
            </form>
        </>
    );
};

export default Login;
