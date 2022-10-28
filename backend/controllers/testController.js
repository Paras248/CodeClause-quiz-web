const BigPromise = require("../middlewares/BigPromise");
const CustomError = require("../utils/CustomError");
const Test = require("../models/test");

exports.getTest = BigPromise(async (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const studentId = req.body.studentId;
    const testId = req.body.testId;

    if (!firstName || !lastName || !studentId || !testId) {
        return next(
            new CustomError("Please provide all details to attempt the quiz", 401)
        );
    }

    const test = await Test.findById(testId);
    if (!test) {
        return next(new CustomError("Test id is incorrect!!!", 400));
    }

    res.status(200).json({
        success: true,
        test,
    });
});
