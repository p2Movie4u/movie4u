require("dotenv").config();
const List = require("../models/List");

module.exports = {
  saveNewList: (movie, status, user) => {
    let newList = new List({
      userId: user._id,
      movieId: movie._id,
      status
    })
    return newList.save()
  },

  random: (x) => {
    return Math.floor(Math.random()*x)
  },

  imgProfile: (file) => {
    return file == undefined ? "http://freelanceme.net/Images/default%20profile%20picture.png" : file.url
  },

  apiCall: (id) =>{
    return axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.APIPELI}`)
  }
}

