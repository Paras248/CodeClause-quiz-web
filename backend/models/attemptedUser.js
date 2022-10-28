const mongoose = require("mongoose");

const attemtptedUsersSchema = new mongoose.Schema({
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
    schoolId: {
        type: String,
        required: [
            true,
            "Please provide id/rollno/enrollment_no/prn provided by school/college",
        ],
    },
    score: {
        type: Number,
        required: [true, "Please provide the score"],
    },
});

module.exports = mongoose.model("AttemptedUser", attemtptedUsersSchema);
