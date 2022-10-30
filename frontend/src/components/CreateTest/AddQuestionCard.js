import React from "react";
import styles from "./css/AddQuestionCard.module.css";

const AddQuestionCard = ({ setShowForm }) => {
    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={() => setShowForm(true)}>
                Add Question
            </button>
        </div>
    );
};

export default AddQuestionCard;
