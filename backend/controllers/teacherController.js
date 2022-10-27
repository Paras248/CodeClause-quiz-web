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
