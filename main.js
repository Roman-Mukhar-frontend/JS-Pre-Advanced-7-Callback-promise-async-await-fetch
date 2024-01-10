"use strict";
let getS = (selector) => document.querySelector(selector);
let getAl = (selector) => document.querySelectorAll(selector);
let title = [];
let rating = [];
let genre = [];
let rated = [];
let year = [];
let plot = [];
let writer = [];
let director = [];
let actors = [];
let boxOffice = [];
let awards = [];
let poster = [];
let check = 0;

/* FUNCTION BUTTON AND INPUT */
getS(".search-input").addEventListener("focus", function (event) {
  event.target.classList.add("focus");
});

getS(".search-input").addEventListener("input", () => {
  getS(".search-close").classList.remove("hide");
});

getS(".search-input").addEventListener("blur", function (event) {
  if (this.value == "") {
    event.target.classList.remove("focus");
    getS(".search-close").classList.add("hide");
  }
});

getS(".search-close").addEventListener("click", function (event) {
  getS(".search-input").value = "";
  event.target.classList.add("hide");
});

/*FUNCTION SEARCH MOVIE*/
const getData = async () => {
  let movieSearch = getS(".search-input").value;
  const response = await fetch(`http://www.omdbapi.com/?s=${movieSearch}&apikey=e1cfdf3a`);
  const data = await response.json();
  movieList(data.Search);
  try {
    for (let i = 0; i < data.Search.length; i++) {
      const responseDetails = await fetch(`http://www.omdbapi.com/?i=${data.Search[i].imdbID}&apikey=e1cfdf3a`);
      const dataDetails = await responseDetails.json();
      getAl(".btn-movie")[i].addEventListener("click", function () {
        detailsMovie(dataDetails);
      });
    }
  } catch (err) {
    return console.log(err);
  }
};

/* FUNCTION CREATE SEARCH MOVIE LIST*/
function movieList(arr) {
  getS(".movies-container").innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    createArr(arr[i]);
  }
}
function createArr(movie) {
  getS(".movies-container").innerHTML += `<div class="movie">
      <div class="img-movie"><img src="${movie.Poster}"></div>
      <div class="name-movie">${movie.Title}</div>
      <div class="text-movie">${movie.Type}</div>
      <div class="year-movie">${movie.Year}</div>
      <input type="button" class="btn-movie" value="More details">
    </div>`;
}

/*FUNCTION SHOW MOVIE DETAILS*/
async function detailsMovie(arr) {
  try {
    getS(".modal").classList.remove("hide");
    getS(".title").textContent = arr.Title;
    getS(".detalis-img").style.backgroundImage = `url("${arr.Poster}")`;
    getS(".rated").textContent = arr.Rated;
    getS(".year").textContent = arr.Year;
    getS(".genre").textContent = arr.Genre;
    getS(".writer").textContent = arr.Writer;
    getS(".director").textContent = arr.Director;
    getS(".actors").textContent = arr.Actors;
    getS(".boxOffice").textContent = arr.BoxOffice;
    getS(".awards").textContent = arr.Awards;
    getS(".plot").textContent = arr.Plot;
    for (let a = 0; a < arr.Ratings.length; a++) {
      let li = document.createElement("li");
      li.textContent += arr.Ratings[a].Source + " " + arr.Ratings[a].Value;
      getS(".ratings").append(li);
    }
  } catch (err1) {
    return console.log(err1);
  }
}

/* Close modal Movie Details */
getS(".modal").addEventListener("click", function () {
  this.classList.add("hide");
});