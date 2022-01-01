"use strict";

//Defino constantes para los elementos HTML
const inputSearch = document.querySelector(".js_animeChapter");
const searchButton = document.querySelector(".js_searchButton");
const resetButton = document.querySelector(".js_resetChapter");
const favoriteSeries = document.querySelector(".js_favoriteSeries");
const resultsSeries = document.querySelector(".js_seriesResults");

//Defino variables
let searchedSerie = "";
let apiResults = [];
let contentResults = "";

//Defino la función de búsqueda
function searchAnime(event) {
  //evitamos que se recargue la página
  event.preventDefault();
  resultsSeries.innerHTML = "";
  fetch(`https://api.jikan.moe/v3/search/anime?q=${inputSearch.value}`)
    .then((response) => response.json())
    .then((data) => {
      const apiResults = data.results;
      console.log(apiResults);

      for (let i = 0; i <= apiResults.length; i++) {
        let animeResults = apiResults[i];
        resultsSeries.innerHTML += `<li>${animeResults.title}</li><img src="${animeResults.image_url}"/>`;
      }
    });
}



//Llamo a las funciones al clickar en los botones
searchButton.addEventListener("click", searchAnime);
