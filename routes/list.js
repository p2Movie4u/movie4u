require("dotenv").config();
const express = require("express");
const passport = require('passport');
const listRoutes = express.Router();
const User = require("../models/User");
const Movie = require("../models/Movie");
const axios = require("axios");


listRoutes.get("/", (req, res, next) => {
  res.render("list/list")
});


listRoutes.get("/new", (req, res, next) => {
  res.render("list/new")
});



module.exports = listRoutes;
