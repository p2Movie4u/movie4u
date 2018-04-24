require("dotenv").config();
const express = require("express");
const passport = require('passport');
const listRoutes = express.Router();
const User = require("../models/User");
const Movie = require("../models/Movie");
const List = require("../models/List");
const axios = require("axios");


listRoutes.get("/", (req, res, next) => {
  res.render("list/list")
});

listRoutes.post("/add/:status/:id", (req, res, next) => {
  let id = req.params.id;
  let status = req.params.status;

  axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.APIPELI}`)
  .then(elem =>{
    let movieData = elem.data;

    Movie.findOne({api_id:movieData.id})
    .then(movie => {
      if(movie != null){
        console.log("Ya existe")
        saveNewList(movie, status, res.locals.user)
        .then(listSaved =>{
          console.log("List Created")
          if(status == "watched"){
            res.redirect("/list/watched-list")
            }else{
            res.redirect("/list/to-watch")
            }          
        })
      }else{
        let producersArray = movieData.production_companies.map((elem)=>{
          return {name: elem.name, logo_path: elem.logo_path}
        });

        let newMovie = new Movie({
          api_id: movieData.id,
          title: movieData.original_title,
          year: movieData.release_date,
          popularity: movieData.popularity,
          runtime: movieData.runtime,
          genres: movieData.genres,
          producers: producersArray,
          overview: movieData.overview,
          language: movieData.original_language,
          poster: movieData.poster_path,
          revenue: movieData.revenue,
          budget: movieData.budget
        });
        newMovie.save()
        .then(movieSaved =>{
          console.log("Movie created")
          saveNewList(movieSaved, status, res.locals.user)
          .then(listSaved =>{
            console.log("List Created") 
            if(status == "watched"){
            res.redirect("/list/watched-list")
            }else{
            res.redirect("/list/to-watch")
            }
          })
        })
      }
    })    
  })

});

listRoutes.get("/watched-list", (req, res, next) => {

  List.find({status:"watched"})
  .populate("movieId")
  .then(movieWatched =>{
    console.log(movieWatched)
    res.render("list/watched-list", {movieWatched})
  })
});

listRoutes.get("/to-watch", (req, res, next) => {

  List.find({status:"watchlist"})
  .populate("movieId")
  .then(movieWatched =>{
    console.log(movieWatched)
    res.render("list/to-watch", {movieWatched})
  })
});

listRoutes.get("/to-watch/show/:id",(req, res, next)=>{
  let id = req.params.id
  console.log("+++++++++ID+++"+id)
  List.findById(id)
  .populate("movieId")
  .then( data =>{
    console.log(data)
    res.render("list/to-watch-details", {data})
  })
})

listRoutes.get("/to-watch/show/:id/delete", (req, res, next) =>{
  let id = req.params.id
  List.findByIdAndRemove(id)
  .then (res.redirect("/list/to-watch"))
})

listRoutes.get("/to-watch/show/:id/edit", (req, res, next) =>{
  let id = req.params.id
  List.findByIdAndUpdate(id, {status: "watched"})
  .then (res.redirect("/list/to-watch"))
})

listRoutes.get("/watched-list/show/:id",(req, res, next)=>{
  let id = req.params.id
  console.log(id)
  List.findById(id)
  .populate("movieId")
  .then( data =>{
    console.log(data)
    res.render("list/watched-details", {data})
  })
})

listRoutes.get("/watched-list/show/:id/delete", (req, res, next) =>{
  let id = req.params.id
  List.findByIdAndRemove(id)
  .then (res.redirect("/list/watched-list"))
})

/* Commons functions */

let saveNewList = function(movie, status, user){
  let newList = new List({
    userId: user._id,
    movieId: movie._id,
    status
  })
  return newList.save()
}

module.exports = listRoutes;
