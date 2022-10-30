const BigPromise = require("../middlewares/BigPromise");
const CustomError = require("../utils/CustomError");
const Test = require("../models/test");
const AttemptedUser = require("../models/attemptedUser");
const mongoose = require("mongoose");

exports.getTest = BigPromise(async (req, res, next) => {
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    const studentId = req.query.studentId;
    const testId = req.query.testId;

    if (!firstName || !lastName || !studentId || !testId) {
        return next(
            res.status(400).json({
                success: false,
                message: "All fields are required to attempt the quiz",
            })
        );
    }

    let test = await Test.findById(testId, async (err, testData) => {
        if (err) {
            return next(
                res.status(400).json({
                    success: false,
                    message: "Test id is not valid",
                })
            );
        }
        return testData;
    }).clone();

    test = {
        _id: test._id,
        title: test.title,
        questions: test.questions,
        timeLimit: test.timeLimit,
        createdAt: test.createdAt,
    };

    res.status(200).json({
        success: true,
        student: {
            studentId,
            firstName,
            lastName,
        },
        test,
    });
});

exports.submitTest = BigPromise(async (req, res, next) => {
    const firstName = req.body.firstName.trim();
    const lastName = req.body.lastName.trim();
    const studentId = req.body.studentId.trim();
    const testId = req.body.testId.trim();
    const score = req.body.score;

    if (!firstName || !lastName || !studentId || !testId || !score) {
        return next(
            res.status(400).json({
                success: false,
                message:
                    "firstName, lastName, studentId, testId, score required to submit the quiz",
            })
        );
    }

    const attempter = await AttemptedUser.create({
        firstName,
        lastName,
        studentId,
        score,
    });

    let test = await Test.findByIdAndUpdate(
        testId,
        {
            $push: { attemptedUsers: attempter._id },
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    if (!test) {
        return next(
            res.status(400).json({
                success: false,
                message:
                    "Test id is invalid. Please re-attempt the test or contact your faculty",
            })
        );
    }

    res.status(200).json({
        success: true,
        test,
    });
});
