const express = require("express");
const Router = express.Router();

const { getTest, submitTest } = require("../controllers/testController");

Router.route("/test").get(getTest);
Router.route("/test").post(submitTest);

module.exports = Router;
