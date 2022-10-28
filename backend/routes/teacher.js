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
const { teacherIsLoggedIn } = require("../middlewares/teacher");

const { getTest } = require("../controllers/testController");

// teacher routes
Router.route("/signup").post(signUp);
Router.route("/signin").post(signIn);
Router.route("/teacherDashboard/test/create").post(teacherIsLoggedIn, createTest);
Router.route("/teacherDashboard").get(teacherIsLoggedIn, showAllTestsInformation);
Router.route("/teacherDashboard/test/delete/:id").delete(
    teacherIsLoggedIn,
    deleteSingleTest
);

//attempt test routes
Router.route("/test").get(getTest);

module.exports = Router;
