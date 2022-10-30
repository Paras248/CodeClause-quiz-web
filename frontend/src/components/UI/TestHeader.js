import React from "react";
import styles from "./css/AuthHeader.module.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const TestHeader = ({ title, questionArray, buttonText }) => {
    const history = useHistory();

    const submitTestHandler = (e) => {
        e.preventDefault();
        let score = 0;
        for (let i = 0; i < questionArray.length; i++) {
            score += +questionArray[i].point;
        }

        const options = {
            method: "POST",
            url: "http://localhost:4000/api/teacherDashboard/test/create",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            data: { title, questions: questionArray, score, timeLimit: "1h" },
        };

        axios
            .request(options)
            .then((response) => {
                console.log(response.data);
                history.push("/teacherDashboard");
            })
            .catch((err) => console.log(err.response.data));
    };
    return (
        <header className={styles.header}>
            <Link to="/" className={styles["title-link"]}>
                <p>Quizie.</p>
            </Link>
            <button className={styles.button} onClick={submitTestHandler}>
                {buttonText}
            </button>
        </header>
    );
};

export default TestHeader;
