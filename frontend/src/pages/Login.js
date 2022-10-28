import React from "react";
import styles from "./css/Login.module.css";

const Login = () => {
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div>
                    <p className={styles.title}>Sign in</p>
                </div>
                <div>
                    <input
                        className={styles.input}
                        type="email"
                        placeholder="Email"
                        name="email"
                    />
                </div>
                <div>
                    <input
                        className={styles.input}
                        type="password"
                        placeholder="Password"
                        name="password"
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <button>Sign in</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
