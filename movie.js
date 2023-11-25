let storedMovieTitle = sessionStorage.getItem("movie");
var apiKey = "534e73de";
var generalInfo = document.getElementById("generalInfo");
var rating = document.getElementById("rating");
var director = document.getElementById("director");
var plotSummary = document.getElementById("plotSummary");
var moviePoster = document.getElementById("moviePoster");

window.onload = function() {
    search();
}


async function search() {
    var encodedTitle = encodeURI(storedMovieTitle);

    var apiURL = `https://www.omdbapi.com/` + `?t=${encodedTitle}` + `&type=movie`+ `&plot=full` + `&apikey=${apiKey}`;
    console.log(apiURL);
        
    var movieDetails = await fetch(apiURL)
        .then(response => response.json())

    console.log(movieDetails);

    var movieTitle = document.getElementById("movieTitle");
    movieTitle.innerHTML = storedMovieTitle;
    document.title = storedMovieTitle;

    generalInfo.innerHTML = movieDetails.Released + " | " + movieDetails.Runtime + " | " + movieDetails.Genre;
    rating.innerHTML = "IMDb Rating: " + movieDetails.imdbRating + "/10";
    director.innerHTML = "Directed by " + movieDetails.Director;

    moviePoster.src = movieDetails.Poster;
    moviePoster.alt = "Movie Poster";

    plotSummary.innerHTML = movieDetails.Plot;
}

