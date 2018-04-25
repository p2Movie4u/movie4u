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
      console.log(e)
    domBody += `
    <div>
    <a href="/movies/show/${e.id}">
    <img src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="" width=200 >
    </a>
    <h5>${e.title}</h5>
    </div>
    `
  })
  containerMovies.innerHTML = domBody;
}

