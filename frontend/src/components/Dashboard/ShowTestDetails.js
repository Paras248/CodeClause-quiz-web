import React, { useEffect, useState } from "react";
import TestDetailCard from "./TestDetailCard";
import styles from "./css/ShowTestDetails.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const ShowTestDetails = () => {
    const [tests, setTests] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const options = {
            method: "GET",
            url: "http://localhost:4000/api/teacherDashboard",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };

        axios
            .request(options)
            .then((response) => setTests(response.data.teacher.tests))
            .catch((err) => history.push("/signin"));
    }, [tests]);

    return (
        <div>
            <p className={styles.title}>
                Welcome {localStorage.getItem("firstName")}{" "}
                {localStorage.getItem("lastName")},
            </p>
            <div>
                {tests.length === 0 && <p className={styles.title}>No tests found.</p>}
                {tests?.map((test) => {
                    const date = new Date(test.createdAt);
                    return (
                        <TestDetailCard
                            key={test._id}
                            setTests={setTests}
                            id={test._id}
                            title={test.title}
                            score={test.score}
                            createdAt={`${date.getDate()}-${date.toLocaleString("en-US", {
                                month: "short",
                            })}-${date.getFullYear()}`}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ShowTestDetails;
