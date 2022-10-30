import axios from "axios";
import React, { useState } from "react";
import styles from "./css/TestDetailCard.module.css";
import CsvDownload from "react-json-to-csv";

const TestDetailCard = (props) => {
    const [data, setData] = useState(null);

    const onDeleteHandler = async () => {
        const options = {
            method: "DELETE",
            url: `http://localhost:4000/api/teacherDashboard/test/delete/${props.id}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };

        axios
            .request(options)
            .then((response) => props.setTests({ ...response.data.teacher.tests }))
            .catch((err) => console.log(err.response.data));
    };

    const showResultHandler = async () => {
        const options = {
            method: "GET",
            url: `http://localhost:4000/api/teacherDashboard/test/result/${props.id}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };

        axios
            .request(options)
            .then((response) => setData(response.data))
            .catch((err) => console.log(err.response.data));
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <p>{props.title}</p>
            </div>
            <div className={styles["details-container"]}>
                <p className={styles.details}>Test ID: {props.id}</p>
                <p className={styles.details}>score: {props.score}</p>
                {/* <p className={styles.details}>created at: {props.createdAt}</p> */}
            </div>

            <div className={styles["button-container"]}>
                {!data ? (
                    <button className={styles.button} onClick={showResultHandler}>
                        Get result
                    </button>
                ) : (
                    <CsvDownload data={data} className={styles["button-container"]}>
                        Download
                    </CsvDownload>
                )}
                <button className={styles.delete} onClick={onDeleteHandler}>
                    Delete Test
                </button>
            </div>
        </div>
    );
};

export default TestDetailCard;
