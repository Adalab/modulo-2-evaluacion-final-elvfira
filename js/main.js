"use strict";

//Defino constantes para los elementos
const inputSearch = document.querySelector("js_narutoChapter");
const searchButton = document.querySelector("js_searchButton");
const resetButton = document.querySelector("js_resetChapter");
const favoriteSeries = document.querySelector("js_favoriteSeries");
const resultsSeries = document.querySelector("js_seriesResults");

//Defino variables
let searchedSerie = '';

//Defino la función de búsqueda
function searchNaruto () {
//Cojo el valor del input Search
searchedSerie = inputSearch.value;

//Ejecuto la API

//Pinto los resultados de la API

};

//Llamo a las funciones al clickar en los botones
searchButton.addEventListener('click', searchNaruto);