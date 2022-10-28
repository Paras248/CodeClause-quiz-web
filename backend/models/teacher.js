const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const teacherSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "please provide the first name"],
        minLength: [2, "First name should be atleast 2 characters"],
    },
    lastName: {
        type: String,
        required: [true, "please provide the last name"],
        minLength: [2, "Last name should be atleast 2 characters"],
    },
    email: {
        type: String,
        required: [true, "please provide an email"],
        validate: [validator.isEmail, "please provide an email in correct form"],
        unique: true,
    },
    password: {
        type: String,
        require: [true, "please provide a password"],
        minLength: [6, "password should be atleast of 6 characters"],
        select: false,
    },
    tests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Test",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// before saving the document the password will be hashed
teacherSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
});

teacherSchema.methods.getJwtToken = async function () {
    const token = await jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "2d",
    });

    return token;
};

// this will be used for login
teacherSchema.methods.comparePassword = async function (password) {
    const isEqual = await bcrypt.compare(password, this.password);
    return isEqual;
};

module.exports = mongoose.model("Teacher", teacherSchema);
