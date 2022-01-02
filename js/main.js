"use strict";

//Defino constantes para los elementos HTML
const inputSearch = document.querySelector(".js_animeChapter");
const searchButton = document.querySelector(".js_searchButton");
const resetButton = document.querySelector(".js_resetChapter");
const favoriteSeries = document.querySelector(".js_favoriteSeries");
const resultsSeries = document.querySelector(".js_seriesResults");

//Constante para las series que no tienen imagen
const urlNoImage = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
const imageNotFound = 'https://cdn.myanimelist.net/images/qm_50.gif?s=e1ff92a46db617cb83bfc1e205aff620';

//Defino variables
let searchedSerie = "";
let contentResults = "";
let animeResults = {};
let pasteFavorite = "";

//Defino la función de elegir series favoritas
function myFavorites(event) {
  const selectFavorite = event.currentTarget;
  // si el elemento selectFavorite contiene la clase selectedItem (comprobar si la contiene) haz algo...
  if (selectFavorite.matches(".selectedItem")) {
    // borra el elemento con la id correspondiente en el ul favoriteSeries
    let chapterId = selectFavorite.getAttribute("id");
    console.log(chapterId);
    const elementToDelete = document.querySelector(
      "ul.js_favoriteSeries #" + chapterId
    );
    console.log(elementToDelete);
    elementToDelete.remove();
  } else {
    pasteFavorite = selectFavorite.cloneNode(true);
    favoriteSeries.appendChild(pasteFavorite);
  }
  // favoriteSeries.innerHTML += selectFavorite;
  // no funciona así que uso DOM
  selectFavorite.classList.toggle("selectedItem");
}

//Defino la función de búsqueda
function searchAnime(event) {
  //evitamos que se recargue la página
  event.preventDefault();
  resultsSeries.innerHTML = "";
  fetch(`https://api.jikan.moe/v3/search/anime?q=${inputSearch.value}`)
    .then((response) => response.json())
    .then((data) => {
      const apiResults = data.results;
      console.log(apiResults.length);

      for (let i = 0; i <= apiResults.length - 1; i++) {
        animeResults = apiResults[i];

        //Sustituir imagen cuando la serie no tiene
        let imageAddress = "";
        if (animeResults.image_url != imageNotFound) {
          imageAddress = animeResults.image_url;
        } else {
          imageAddress = urlNoImage;
        }

        //comprobar si este capítulo está en favoritos y ponerlo en verde (con un if)
        let markFavorite = "";
        // if (¿existe?) {
        //   markFavorite = "selectedItem";
        // } else {
        // }

        resultsSeries.innerHTML += `<li class="js_itemResult ${markFavorite}" id="chapter-${animeResults.mal_id}"><p>${animeResults.title}</p><img src="${imageAddress}"/></li>`;
      }

      const allResults = document.querySelectorAll(".js_itemResult");

      for (const eachItem of allResults) {
        eachItem.addEventListener("click", myFavorites);
      }
    });
}

//Llamo a las funciones al clickar en los botones
searchButton.addEventListener("click", searchAnime);
