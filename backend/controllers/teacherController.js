const BigPromise = require("../middlewares/BigPromise");
const CustomError = require("../utils/CustomError");
const Teacher = require("../models/teacher");
const cookieToken = require("../utils/cookieToken");
const Test = require("../models/test");
const mongoose = require("mongoose");

exports.signUp = BigPromise(async (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    if (!firstName || !lastName || !email || !password) {
        return next(
            new CustomError("first name, lastname, email, password are required", 400)
        );
    }

    const teacher = await Teacher.create({ firstName, lastName, email, password });

    cookieToken(teacher, res);
});

exports.signIn = BigPromise(async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return next(new CustomError("email and password are required!!!", 400));
    }

    const teacher = await Teacher.findOne({ email }).select("+password");

    if (!teacher) {
        return next(
            new CustomError("Email or password doesn't match or user doesn't exists", 400)
        );
    }

    const isValid = await teacher.comparePassword(password);

    if (!isValid) {
        return next(new CustomError("Password is incorrect", 400));
    }

    cookieToken(teacher, res);
});

exports.createTest = BigPromise(async (req, res, next) => {
    const testTitle = req.body.title;
    const testQuestions = req.body.questions;
    const testTimeLimit = req.body.timeLimit;
    const score = req.body.score;

    if (!testTitle || !testQuestions || !testTimeLimit) {
        return next(
            new CustomError(
                "test title, questions, timelimit are required to create quiz",
                400
            )
        );
    }
    const test = await Test.create({
        title: testTitle,
        questions: testQuestions,
        score,
        timeLimit: testTimeLimit,
    });

    let teacher = req.teacher;
    const teacherId = teacher._id;
    const testData = [{ _id: test._id }, ...teacher.tests];

    const updatedTeacher = await Teacher.findByIdAndUpdate(
        teacherId,
        {
            $set: { tests: testData },
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    req.teacher = updatedTeacher;

    res.status(200).json({
        success: true,
        teacher: updatedTeacher,
    });
});

// this method will be used for teacher dashboard
exports.showAllTestsInformation = BigPromise(async (req, res, next) => {
    let teacher = req.teacher;
    teacher = await teacher.populate("tests");
    res.status(200).json({
        success: true,
        teacher,
    });
});

// this is to display the test results
exports.showSingleTestResult = BigPromise(async (req, res, next) => {
    const testId = req.params.id;

    if (!testId) {
        return next(new CustomError("Please provide correct test id", 400));
    }

    let test = await Test.findById(testId).populate("attemptedUsers");

    if (!test) {
        return next(new CustomError("Test not found!!!", 400));
    }

    test = {
        _id: test._id,
        title: test.title,
        attemptedUsers: test.attemptedUsers,
        timeLimit: test.timeLimit,
        createdAt: test.createdAt,
    };

    res.status(200).json({
        success: true,
        test,
    });
});

// this is to delete a single test
exports.deleteSingleTest = BigPromise(async (req, res, next) => {
    const testId = req.params.id.trim();
    if (!testId) {
        return next(new CustomError("Please provide the id for the test", 400));
    }

    let teacher = req.teacher;
    const testsData = teacher.tests.filter((test) => {
        return test._id != testId;
    });

    teacher = await Teacher.findByIdAndUpdate(
        teacher.id,
        {
            $set: { tests: testsData },
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    await Test.findByIdAndDelete(testId);

    req.user = teacher;

    res.status(200).json({
        success: true,
        message: "Test deleted successfully",
        teacher,
    });
});
