require("dotenv").config();

const mongoose = require("mongoose");
const Movie = require("../models/Movie");
const movie_data = require("./movie_data");

mongoose.connect(process.env.dbURL).then(() => {
  console.log(`Conected to db ${process.env.dbURL}`);

  // mongoose.connection.db.dropCollection("movies").then(() => {
  //   console.log("Collection deleted");

    movie_data.forEach(e => {
      let movie = new Movie({
        Title: e.Title,
        Year: e.Year,
        Rating: e.Rating,
        Runtime: e.Runtime,
        Genre: e.Genre,
        Director: e.Director,
        Writer: e.Writer,
        Actors: e.Actors,
        Plot: e.Plot,
        Country: e.Country,
        Poster: e.Poster
      })
        .save()
        .then(() => {
          console.log("Movie created");
          mongoose.disconnect();
        });
    });
  });
// });