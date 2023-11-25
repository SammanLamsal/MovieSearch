var apiKey = "534e73de";

var button = document.getElementById("searchButton");
var movieTitle = document.getElementById("searchText").value;
var list = document.getElementById("list");
var numClicked = 0;
var searchOptionsTxt;
var pageNumber = 1;
var prevButton = document.createElement("button");
var nextButton = document.createElement("button");
var numOfResults;
var numOfResultsParagraph = document.createElement("p");
var h1Tag = document.createElement("h1");

function showResults(data) {
    var orderedList = document.getElementById("list");
    let toMovieDetails;
    var temp;

    if(data.Response == "False") {
        numOfResultsParagraph.innerHTML = "Movie not found!";
    }
    else{
        for (let item in data.Search) {
            toMovieDetails = document.createElement("a");
            toMovieDetails.href = "movieDetails.html";
            var listElement = document.createElement("li");
            listElement.appendChild(toMovieDetails);
            toMovieDetails.innerHTML = data.Search[item].Title;
            orderedList.appendChild(listElement);
            toMovieDetails.onclick = function() {
                sessionStorage.setItem("movie", data.Search[item].Title);
            }
        }
        numOfResults = Math.ceil(data.totalResults/10);
        numOfResultsParagraph.innerHTML = `Page ${pageNumber} of ${numOfResults} (${data.totalResults} results total)`;
    }
        h1Tag.id = "h1Tag";
        h1Tag.innerHTML = "Results";
        addNavigationButtons();

        numOfResultsParagraph.id = "numOfResultsParagraph";
        list.insertAdjacentElement("afterend", numOfResultsParagraph);

        temp = document.getElementById("searchButton");
        temp.insertAdjacentElement("afterend", h1Tag);

}


button.onclick = function () {
    h1Tag.innerHTML = ``;
    numOfResultsParagraph.innerHTML = ``;
    list.innerHTML = ``;
    search(searchText.value);
}

function search(movieTitle) {
    searchOptionsTxt = document.getElementById("searchOptionsTxt").value;
    console.log(searchOptionsTxt)
    var encodedTitle = encodeURI(movieTitle);

    var apiURL = `https://www.omdbapi.com/` + `?s=${encodedTitle}` + `&type=movie`+ `&y=${searchOptionsTxt}`+ `&page=${pageNumber}` + `&apikey=${apiKey}`;

    fetch(apiURL)
        .then(response => response.json())
        .then(data => showResults(data));

}

nextButton.onclick = function() {
    if(pageNumber != numOfResults) {
        pageNumber++;
        list.innerHTML = ``;
        numOfResultsParagraph.innerHTML = ``;
        search(searchText.value);
    }
}

prevButton.onclick = function() {
    if(pageNumber != 1) {
        pageNumber--;
        list.innerHTML = ``;
        numOfResultsParagraph.innerHTML = ``;
        search(searchText.value);
    }
}

function addNavigationButtons() {

    prevButton.innerHTML = "Prev";
    nextButton.innerHTML = "Next";

    list.insertAdjacentElement("afterend", nextButton);
    list.insertAdjacentElement("afterend", prevButton);

}