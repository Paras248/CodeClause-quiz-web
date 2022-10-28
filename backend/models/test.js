const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
    questions: {
        type: [{}],
        required: [true, "Please provide atleast one questions to create test"],
    },
    attemtptedUsers: [{ type: mongoose.SchemaTypes.ObjectId, ref: "AttemptedUser" }],
    timeLimit: {
        type: String,
        required: [true, "Please provide a time limit for the test"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Test", testSchema);
