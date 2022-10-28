// package imports
const express = require("express");
const Router = express.Router();

// file imports
const {
    signUp,
    signIn,
    createTest,
    showAllTestsInformation,
    deleteSingleTest,
} = require("../controllers/teacherController");

// custom middlewares
const { teacherIsLoggedIn } = require("../middlewares/teacher");

Router.route("/signup").post(signUp);
Router.route("/signin").post(signIn);
Router.route("/teacherDashboard/test/create").post(teacherIsLoggedIn, createTest);
Router.route("/teacherDashboard").get(teacherIsLoggedIn, showAllTestsInformation);
Router.route("/teacherDashboard/test/delete/:id").delete(
    teacherIsLoggedIn,
    deleteSingleTest
);

module.exports = Router;
