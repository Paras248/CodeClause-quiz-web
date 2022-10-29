import React from "react";
import styles from "./css/OptionCard.module.css";

const OptionCard = (props) => {
    return (
        <div className={styles.container}>
            <p className={styles.text}>{props.text}</p>
        </div>
    );
};

export default OptionCard;
