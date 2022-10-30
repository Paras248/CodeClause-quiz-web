import React, { useState } from "react";
import styles from "./css/Signup.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import HomeHeader from "../components/UI/HomeHeader";

const Home = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [studentId, setStudentId] = useState("");
    const [testId, setTestId] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();

    const onFirstNameInputChangeHandler = (event) => {
        setFirstName(event.target.value);
        setError(false);
    };

    const onLastNameInputChangeHandler = (event) => {
        setLastName(event.target.value);
        setError(false);
    };

    const onStudentIdChangeHandler = (event) => {
        setStudentId(event.target.value);
        setError(false);
    };

    const onTestIdChangeHandler = (event) => {
        setTestId(event.target.value);
        setError(false);
    };

    const onFormSubmitHandler = (event) => {
        event.preventDefault();

        const options = {
            method: "GET",
            url: `http://localhost:4000/api/test?firstName=${firstName.trim()}&lastName=${lastName.trim()}&studentId=${studentId.trim()}&testId=${testId.trim()}`,
        };

        axios
            .request(options)
            .then((response) => {
                localStorage.setItem("test", JSON.stringify(response.data));
                history.push(`/test/${testId}`);
            })
            .catch((err) => setError(err.response.data.message));
    };

    return (
        <>
            <HomeHeader />
            <form onSubmit={onFormSubmitHandler} encType="application/json">
                <div className={styles.container}>
                    <div>
                        <p className={styles.title}>Enter Test Details</p>
                    </div>

                    {error ? <p className={styles["error-text"]}>{error}</p> : null}
                    <div className={styles["input-container"]}>
                        <input
                            className={`${styles.input} ${
                                error && styles["error-input"]
                            }`}
                            type="text"
                            placeholder="First name"
                            name="firstName"
                            onChange={onFirstNameInputChangeHandler}
                            value={firstName}
                        />
                        <input
                            className={`${styles.input} ${
                                error && styles["error-input"]
                            }`}
                            type="text"
                            placeholder="Last name"
                            name="lastName"
                            onChange={onLastNameInputChangeHandler}
                            value={lastName}
                        />
                        <input
                            className={`${styles.input} ${
                                error && styles["error-input"]
                            }`}
                            type="text"
                            placeholder="Student ID | Roll No"
                            name="studentId"
                            onChange={onStudentIdChangeHandler}
                            value={studentId}
                        />

                        <input
                            className={`${styles.input} ${
                                error && styles["error-input"]
                            }`}
                            type="text"
                            placeholder="Test Id"
                            name="testId"
                            onChange={onTestIdChangeHandler}
                            value={testId}
                        />
                    </div>
                    <button className={styles.button} type="submit">
                        Enter
                    </button>
                </div>
            </form>
        </>
    );
};

export default Home;
