import React, { useEffect, useState } from "react";
import DetailsCard from "../components/AttemptQuiz/DetailsCard";
import QuestionCard from "../components/AttemptQuiz/QuestionCard";

const AttemptQuiz = () => {
    let testObject = JSON.parse(localStorage.getItem("test"));
    const firstName = testObject.student.firstName;
    const lastName = testObject.student.lastName;
    const studentId = testObject.student.studentId;
    const testId = testObject.test._id;
    const testTitle = testObject.test.title;
    const questions = testObject.test.questions;
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);

    return (
        <div>
            <DetailsCard
                firstName={firstName}
                lastName={lastName}
                title={testTitle}
                studentId={studentId}
            />
            {index < questions.length && (
                <QuestionCard
                    firstName={firstName}
                    lastName={lastName}
                    testId={testId}
                    studentId={studentId}
                    key={index}
                    id={index + 1}
                    title={questions[index].title}
                    options={questions[index].options}
                    point={questions[index].point}
                    ans={questions[index].ans}
                    setIndex={setIndex}
                    questionsLength={questions.length}
                    setScore={setScore}
                    score={score}
                />
            )}
        </div>
    );
};

export default AttemptQuiz;
