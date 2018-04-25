const commons = {
  saveNewList: function(movie, status, user){
    let newList = new List({
      userId: user._id,
      movieId: movie._id,
      status
    })
    return newList.save()
  }
}


module.exports = commons;