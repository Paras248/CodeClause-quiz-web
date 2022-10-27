const BigPromise = require("../middlewares/BigPromise");
const CustomError = require("../utils/CustomError");
const Teacher = require("../models/teacher");
const cookieToken = require("../utils/cookieToken");

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
