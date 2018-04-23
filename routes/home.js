const express = require("express");
const passport = require('passport');
const homeRoutes = express.Router();
const User = require("../models/User");
const Movie = require("../models/Movie");


homeRoutes.get("/home", (req, res, next) => {
  res.render("home/index", { "message": req.flash("error") });
});

module.exports = homeRoutes;