import React from "react";
import styles from "./css/ResultDetailCard.module.css";

const ResultDetailCard = (props) => {
    return (
        <>
            <div className={styles.container}>
                <p className={styles.p}>
                    Name: {props.firstName} {props.lastName}
                </p>
                <p className={styles.p}>Student Id: {props.studentId}</p>
                <p className={styles.p}>scored: {props.score}</p>
            </div>
        </>
    );
};

export default ResultDetailCard;
