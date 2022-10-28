import React from "react";
import styles from "./css/Signup.module.css";
import AuthHeader from "../components/UI/AuthHeader";

const Signup = () => {
    return (
        <>
            <AuthHeader buttonText="Sign in" />
            <form>
                <div className={styles.container}>
                    <div>
                        <p className={styles.title}>Sign up for free today</p>
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
                    <button className={styles.button}>Sign up</button>
                </div>
            </form>
        </>
    );
};

export default Signup;
