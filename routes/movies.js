require("dotenv").config();
const express = require("express");
const passport = require('passport');
const moviesRoutes = express.Router();
const User = require("../models/User");
const Movie = require("../models/Movie");
const uploadCloud = require('../config/cloudinary.js');
const axios = require("axios");
const commons = require("../config/commons");


moviesRoutes.get("/", (req, res, next) => {
 res.render("movies/index");
});

moviesRoutes.get("/show/:id",(req, res, next)=>{
  let id = req.params.id;
  commons.apiCall(id)
  .then(elem =>{
    console.log(elem.data);
    res.render("movies/show",{data: elem.data});
  })
})


module.exports = moviesRoutes;
