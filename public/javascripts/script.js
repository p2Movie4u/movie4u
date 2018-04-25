document.addEventListener(
  "DOMContentLoaded",
  () => {
    let searchInput = document.getElementById("input-title");
   
    if (searchInput) {
      searchInput.addEventListener("keyup", event => {
        let searchInputValue = event.target.value;

        if (searchInputValue != ""){
        searchApi(searchInputValue);
        
        }  
      });
    }
  },
  false
);


let searchApi = function(searchInputValue){
  axios
  .get(
    `https://api.themoviedb.org/3/search/movie?api_key=5c457818f5e4a9b775d0ac6ade573529&language=en-US&query=${searchInputValue}`
  )
  .then(elem => {
    let data = elem.data.results;
    printMovies(data);
  });
}

let printMovies = function(movies){

  let containerMovies = document.getElementById("container-movies");
  containerMovies.innerHTML = "";
  let domBody = "";
    movies.forEach((e) =>{
      console.log("++++++++++++"+e.poster_path)
      if(e.poster_path){
        src =  `https://image.tmdb.org/t/p/w500${e.poster_path}`
      }else{
        src = "/images/default-movie.png"
      }
      console.log("********"+src)
    domBody += `
    <div class="movie-item">
    <a href="/movies/show/${e.id}">
    <img src="${src}" alt="" >
    </a>
    </div>
    `
  })
  containerMovies.innerHTML = domBody;
}

