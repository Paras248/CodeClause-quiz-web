// package imports
const express = require("express");
const Router = express.Router();

// file imports
const { signUp } = require("../controllers/teacherController");

Router.route("/signup").post(signUp);

module.exports = Router;
