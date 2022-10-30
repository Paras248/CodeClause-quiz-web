import React, { useEffect, useState } from "react";
import CreateTestForm from "../components/CreateTest/CreateTestForm";
import styles from "./css/CreateTest.module.css";
import AddQuestionCard from "../components/CreateTest/AddQuestionCard";
import QuestionCard from "../components/CreateTest/QuestionCard";
import InputTestTitle from "../components/CreateTest/InputTestTitle";
import TestHeader from "../components/UI/TestHeader";

const CreateTest = () => {
    const [questionArray, setQuestionArray] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");

    const onQuestionDeleteHandler = (id) => {
        const questions = questionArray.filter((question, index) => {
            return id !== index;
        });
        setQuestionArray(questions);
    };

    return (
        <>
            <TestHeader buttonText="Submit" title={title} questionArray={questionArray} />
            <InputTestTitle title={title} setTitle={setTitle} />
            {!showForm ? (
                <AddQuestionCard setShowForm={setShowForm} />
            ) : (
                <CreateTestForm
                    questionArray={questionArray}
                    setQuestionArray={setQuestionArray}
                    setShowForm={setShowForm}
                />
            )}
            <div>
                {questionArray?.map((item, index) => {
                    return (
                        <QuestionCard
                            key={index}
                            id={index}
                            title={item.title}
                            options={item.options}
                            ans={item.ans}
                            point={item.point}
                            onQuestionDeleteHandler={onQuestionDeleteHandler}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default CreateTest;
