import React from "react";
import styles from "./css/AuthHeader.module.css";
import { Link } from "react-router-dom";

const AuthHeader = (props) => {
    return (
        <header className={styles.header}>
            <Link to="/" className={styles["title-link"]}>
                <p>Quizie</p>
            </Link>
            <button className={styles.button}>{props.buttonText}</button>
        </header>
    );
};

export default AuthHeader;
