$(".icon").click(function () {
  $(".search-bar").toggleClass("expand");
  $(".search").addClass("expand");
  $(".icon").toggleClass("border-fix");
});

const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a55df8de6ba9ee610ad8d12fb4a91a7f&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=a55df8de6ba9ee610ad8d12fb4a91a7f&query="';

const main = document.querySelector("#main");
const form = document.querySelector(".search-bar");
const search = document.querySelector(".search");
//Get initial movies
getMovies(API_URL);
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}
function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    if (poster_path != null) {
      const movieEl = document.createElement("div");
      movieEl.classList.add("movie");
      movieEl.innerHTML = `
      <img
        src="${IMG_PATH + poster_path}"
        alt="${title}"
      />
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        <button class="open-overview toggle-overview"><i class="fa-solid fa-chevron-up"></i></button>
      </div>
      <div class="overview">
      <div class="container">
      <h3>Overview</h3>
      <button class="close-overview toggle-overview"><i class="fa-solid fa-chevron-down"></i></button>
        </div>
        <p>
        ${overview}
        </p>
      </div> `;
      main.appendChild(movieEl);
    }
  });
}
function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;

  if (searchTerm && searchTerm != "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});
setTimeout(() => {
  const openToggles = document.querySelectorAll(".open-overview");
  const closeToggles = document.querySelectorAll(".close-overview");
  Toggles(openToggles);
  Toggles(closeToggles);
}, 50);
function Toggles(array) {
  const overviews = document.querySelectorAll(".overview");
  array.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      var current = Array.prototype.indexOf.call(array, toggle);

      overviews[current].classList.toggle("show");
    });
  });
}
