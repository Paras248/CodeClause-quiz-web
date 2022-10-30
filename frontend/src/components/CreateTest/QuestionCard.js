import React from "react";
import styles from "./css/QuestionCard.module.css";

const QuestionCard = (props) => {
    return (
        <div className={styles.container}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <p style={{ fontWeight: "bold" }}>{props.title}</p>
                <button
                    className={styles["delete-button"]}
                    onClick={() => props.onQuestionDeleteHandler(props.id)}
                >
                    delete
                </button>
            </div>

            <ol type="a">
                {props.options?.map((item, index) => {
                    return (
                        <li key={index} style={{ marginBottom: 20 }}>
                            {item}
                        </li>
                    );
                })}
            </ol>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ color: "green", padding: 10 }}>Ans: {props.ans}</p>
                <p style={{ color: "red" }}>
                    <i>Point: {props.point}</i>
                </p>
            </div>
        </div>
    );
};

export default QuestionCard;
