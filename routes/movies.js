const express = require("express");
const passport = require('passport');
const moviesRoutes = express.Router();
const User = require("../models/User");
const uploadCloud = require('../config/cloudinary.js');


moviesRoutes.get("/", (req, res, next) => {
  res.render("movies/index");
});

module.exports = moviesRoutes;