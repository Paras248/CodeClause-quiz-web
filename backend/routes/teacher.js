// package imports
const express = require("express");
const Router = express.Router();

// file imports
const { demo } = require("../controllers/teacherController");

Router.route("/demo").get(demo);

module.exports = Router;
