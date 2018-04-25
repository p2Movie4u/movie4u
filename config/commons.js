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
  }
}