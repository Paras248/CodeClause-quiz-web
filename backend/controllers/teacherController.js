const BigPromise = require("../middlewares/BigPromise");
const CustomError = require("../utils/CustomError");
const Teacher = require("../models/teacher");
const cookieToken = require("../utils/cookieToken");
const Test = require("../models/test");
const { findById, findByIdAndUpdate } = require("../models/teacher");
const teacher = require("../models/teacher");

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
        timeLimit: testTimeLimit,
    });

    const teacher = req.teacher;
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

    const populated = await updatedTeacher.populate("tests");

    res.status(200).json({
        success: true,
        teacher: populated,
    });
});
