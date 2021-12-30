"use strict";

//Defino constantes para los elementos
const inputSearch = document.querySelector(".js_narutoChapter");
const searchButton = document.querySelector(".js_searchButton");
const resetButton = document.querySelector(".js_resetChapter");
const favoriteSeries = document.querySelector(".js_favoriteSeries");
const resultsSeries = document.querySelector(".js_seriesResults");

//Defino variables
let searchedSerie = '';
let apiResults = [];
let contentResults = '';

//Defino la función de búsqueda
function searchNaruto () {
//evitamos que se recargue la página
event.preventDefault();

//Cojo el valor del input Search
searchedSerie = inputSearch.value;

//Ejecuto la API
fetch('https://api.jikan.moe/v3/search/anime?q=naruto')
  .then((response) => response.json())
  .then((data) => {
    apiResults = data.results;
    //Pinto los resultados de la API
    //Hago un bucle que recorra todo el array y pinte sus 50 elementos
    
    //Desde el capítulo 0 hasta el 49 ve añadiendo li's con cada captulo

    contentResults = `<li>${apiResults[0].title}</li>`;

    //Pinto el resultado del bucle
    resultsSeries.innerHTML = contentResults;

  });
  
};

//Llamo a las funciones al clickar en los botones
searchButton.addEventListener('click', searchNaruto);
