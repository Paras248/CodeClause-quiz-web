import React from "react";
import styles from "./css/HomeHeader.module.css";
import { Link } from "react-router-dom";

const AuthHeader = (props) => {
    return (
        <header className={styles.header}>
            <Link to="/" className={styles["title-link"]}>
                <p>Quizie.</p>
            </Link>
            <div>
                <Link to="/signin">
                    <button className={styles.button}>Sign in</button>
                </Link>
                <Link to="/signup">
                    <button className={styles.button}>Sign up</button>
                </Link>
            </div>
        </header>
    );
};

export default AuthHeader;
