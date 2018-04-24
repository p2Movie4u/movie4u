require("dotenv").config();
const express = require("express");
const passport = require('passport');
const moviesRoutes = express.Router();
const User = require("../models/User");
const uploadCloud = require('../config/cloudinary.js');
const axios = require("axios");


moviesRoutes.get("/", (req, res, next) => {
 res.render("movies/index");
});

moviesRoutes.get("/show/:id",(req, res, next)=>{
  let id = req.params.id;
  axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.APIPELI}`)
  .then(elem =>{
    console.log(elem.data);
    res.render("movies/show",{data: elem.data});
  })
})


module.exports = moviesRoutes;
