// package imports
const express = require("express");
const Router = express.Router();

// file imports
const { signUp, signIn } = require("../controllers/teacherController");

Router.route("/signup").post(signUp);
Router.route("/signin").post(signIn);

module.exports = Router;
