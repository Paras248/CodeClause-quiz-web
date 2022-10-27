// package imports
require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

// file imports
const teacher = require("./routes/teacher");

// express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser());

// custom middlewares
app.use("/api", teacher);

module.exports = app;
