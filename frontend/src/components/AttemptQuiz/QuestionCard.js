import React, { useState } from "react";
import styles from "./css/QuestionCard.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const QuestionCard = (props) => {
    const [point, setPoint] = useState(0);
    const { firstName, lastName, studentId, testId, score } = props;

    const history = useHistory();

    const onRadioButtonChangeHandler = (e) => {
        if (e.target.value === props.ans) {
            setPoint(props.point);
        }
        if (e.target.value !== props.ans) {
            setPoint(0);
        }
    };

    const onNextClickHander = () => {
        props.setScore((pre) => pre + point);
        props.setIndex((pre) => pre + 1);
    };

    const onSubmitHandler = () => {
        props.setScore((pre) => pre + point);
        const options = {
            method: "POST",
            url: "http://localhost:4000/api/test",
            data: { firstName, lastName, studentId, testId, score },
        };

        axios
            .request(options)
            .then((response) => {
                localStorage.removeItem("test");
                window.alert("Test submitted successfully");
                history.push("/");
            })
            .catch((err) => {
                window.alert(err.response.data.message);
            });
    };

    return (
        <div className={styles.container}>
            <div className={styles["question-container"]}>
                <p style={{ fontWeight: "bold" }}>{`${props.id}] ${props.title}`}</p>
                <p style={{ fontSize: 12, color: "red", fontStyle: "italic" }}>
                    Point: {props.point}
                </p>
            </div>
            <div onChange={onRadioButtonChangeHandler}>
                {props.options.map((option, index) => {
                    return (
                        <div key={index} className={styles.options}>
                            <input type="radio" name="question" value={option} />
                            <label style={{ marginLeft: 10 }}>{option}</label>
                        </div>
                    );
                })}
            </div>
            <div className={styles["button-container"]}>
                {props.id === props.questionsLength ? (
                    <button className={styles.button} onClick={onSubmitHandler}>
                        Submit
                    </button>
                ) : (
                    <button className={styles.button} onClick={onNextClickHander}>
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuestionCard;
