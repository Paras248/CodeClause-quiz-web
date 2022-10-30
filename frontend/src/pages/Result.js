import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ResultDetailCard from "../components/Result/ResultDetailCard";
import { Link } from "react-router-dom";
import styles from "./css/Result.module.css";

const Result = () => {
    const [data, setData] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        console.log(data);
    }, [data]);
    useEffect(() => {
        const options = {
            method: "GET",
            url: `http://localhost:4000/api/teacherDashboard/test/result/${id}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };

        axios
            .request(options)
            .then((response) => setData(response.data.test.attemptedUsers))
            .catch((err) => console.log(err.response.data));
    }, []);

    return (
        <div>
            <header className={styles.header}>
                <Link to="/" className={styles["title-link"]}>
                    <p>Quizie.</p>
                </Link>
                <Link to="/teacherDashboard">
                    <button className={styles.button}>Go back</button>
                </Link>
            </header>
            {!data ||
                (data.length === 0 && (
                    <h2 style={{ textAlign: "center" }}>No one attempted quiz yet</h2>
                ))}
            {data &&
                data.map((item) => (
                    <ResultDetailCard
                        firstName={item.firstName}
                        lastName={item.lastName}
                        studentId={item.studentId}
                        score={item.score}
                    />
                ))}
        </div>
    );
};

export default Result;
