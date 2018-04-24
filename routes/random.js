require("dotenv").config();
const express = require("express");
const passport = require('passport');
const randomRoutes = express.Router();
const User = require("../models/User");
const Movie = require("../models/Movie");
const List = require("../models/List");
const axios = require("axios");


randomRoutes.get("/", (req, res, next) =>{

  List.find({status: "watchlist"})
  .populate("movieId")
  .then(data => {
    let randomIndex = Math.floor(Math.random()*data.length);
    let randomMovie = data[randomIndex]
    console.log(randomMovie)
    res.render("random/index",{randomMovie})
  })
  
})

module.exports = randomRoutes;