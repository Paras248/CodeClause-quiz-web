const BigPromise = require("../middlewares/BigPromise");
const CustomError = require("../utils/CustomError");
const Test = require("../models/test");
const AttemptedUser = require("../models/attemptedUser");

exports.getTest = BigPromise(async (req, res, next) => {
    const firstName = req.body.firstName.trim();
    const lastName = req.body.lastName.trim();
    const studentId = req.body.studentId.trim();
    const testId = req.body.testId.trim();

    if (!firstName || !lastName || !studentId || !testId) {
        return next(
            new CustomError(
                "firstName, lastName, studentId, testId required to attempt the quiz",
                401
            )
        );
    }

    let test = await Test.findById(testId);

    if (!test) {
        return next(new CustomError("Test not found. Please check your test id!!!", 400));
    }

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
            new CustomError(
                "firstName, lastName, studentId, testId, score required to submit the quiz",
                401
            )
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
        return next(new CustomError("Test not found. Please check your test id!!!", 400));
    }

    res.status(200).json({
        success: true,
        test,
    });
});
