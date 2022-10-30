import React, { useEffect, useState } from "react";
import styles from "./css/CreateTestForm.module.css";
import OptionCard from "./OptionCard";

const CreateTestForm = ({ setQuestionArray, setShowForm }) => {
    const [question, setQuestion] = useState("");
    const [option, setOption] = useState("");
    const [answer, setAnswer] = useState("");
    const [optionsArray, setOptionsArray] = useState([]);
    const [point, setPoint] = useState(1);

    const onQuestionChangeHandler = (e) => {
        setQuestion(e.target.value);
    };

    const onOptionChangeHandler = (e) => {
        setOption(e.target.value);
    };

    const onAnswerChangeHandler = (e) => {
        setAnswer(e.target.value);
    };

    const onPointChangeHandler = (e) => {
        setPoint(e.target.value);
    };

    const onAddOptionClickHandler = () => {
        if (option.trim().length > 0) {
            setOptionsArray((prevState) => [...prevState, option.trim()]);
        }
        setOption("");
    };

    const onResetClickHandler = () => {
        setAnswer("");
        setOption("");
        setQuestion("");
        setPoint(1);
        setOptionsArray([]);
        setShowForm(false);
    };

    const onSubmitClickHandler = () => {
        setQuestionArray((prevState) => [
            ...prevState,
            { title: question, options: optionsArray, point, ans: answer },
        ]);
        setShowForm(false);
    };

    return (
        <div className={styles.container}>
            <p className={styles.text}>Question</p>
            <input
                name="question"
                className={styles.input}
                onChange={onQuestionChangeHandler}
                value={question}
            />

            <p className={styles.text}>Add option</p>
            <div className={styles["input-container"]}>
                <input
                    name="option"
                    className={styles.input}
                    onChange={onOptionChangeHandler}
                    value={option}
                />
                <button className={styles.button} onClick={onAddOptionClickHandler}>
                    Add option
                </button>
            </div>

            {optionsArray?.map((item, index) => {
                return <OptionCard key={index} text={item} />;
            })}

            <p className={styles.text}>Add Single answer</p>
            <div className={styles["input-container"]}>
                <input
                    name="answer"
                    className={styles.input}
                    onChange={onAnswerChangeHandler}
                    value={answer}
                />
            </div>

            <p className={styles.text}>Point</p>

            <div className={styles["input-container"]}>
                <input
                    name="option"
                    className={styles.input}
                    onChange={onPointChangeHandler}
                    value={point}
                    type="number"
                />
                <button className={styles.button} onClick={onSubmitClickHandler}>
                    Submit Question
                </button>
                <button className={styles.button} onClick={onResetClickHandler}>
                    Reset
                </button>
            </div>
        </div>
    );
};

export default CreateTestForm;
