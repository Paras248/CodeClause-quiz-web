const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
    title: {
        type: String,
        reqiured: [true, "title for the test is required"],
    },
    questions: {
        type: [
            {
                title: {
                    type: String,
                    required: [true, "please provide a question title"],
                },
                options: {
                    type: [String],
                    required: [true, "please provide atleast two options"],
                },
                ans: {
                    type: String,
                    required: [true, "please provide an answer to the question"],
                },
            },
        ],
        required: [true, "Please provide atleast one questions to create test"],
    },
    timeLimit: {
        type: String,
        required: [true, "Please provide a time limit for the test"],
    },
    attemptedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "AttemptedUser" }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Test", testSchema);
