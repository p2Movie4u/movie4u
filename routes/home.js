require("dotenv").config();
const express = require("express");
const passport = require('passport');
const homeRoutes = express.Router();
const User = require("../models/User");
const Movie = require("../models/Movie");
const axios = require("axios");


homeRoutes.get("/home", (req, res, next) => {

  axios.get(`https://api.themoviedb.org/3/search/collection?api_key=${process.env.APIPELI}&query=the`)
  .then(elem => {
    let data = elem.data.results
    res.render("home/index",{data});
  })
});

//Profile with Id, query findbyid nots necessary
homeRoutes.get("/profile", (req, res, next) => {
  res.render(("home/profile"), {user: res.locals.user})
})



module.exports = homeRoutes;
