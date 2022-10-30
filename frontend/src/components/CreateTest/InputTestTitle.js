import React from "react";
import styles from "./css/InputTestTitle.module.css";
const InputTestTitle = ({ title, setTitle }) => {
    const onTitleChangeHandler = (e) => {
        setTitle(e.target.value);
    };

    return (
        <div className={styles.container}>
            <p className={styles.text}>Test Title</p>
            <input
                name="question"
                className={styles.input}
                onChange={onTitleChangeHandler}
                value={title}
            />
        </div>
    );
};

export default InputTestTitle;
