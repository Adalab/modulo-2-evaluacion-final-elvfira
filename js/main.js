"use strict";

//Defino constantes para los elementos HTML
const inputSearch = document.querySelector(".js_animeChapter");
const searchButton = document.querySelector(".js_searchButton");
const resetButton = document.querySelector(".js_resetChapter");
const favoriteSeries = document.querySelector(".js_favoriteSeries");
const resultsSeries = document.querySelector(".js_seriesResults");

//Constante para las series que no tienen imagen
const urlNoImage = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
const imageNotFound =
  "https://cdn.myanimelist.net/images/qm_50.gif?s=e1ff92a46db617cb83bfc1e205aff620";

//Defino variables
let searchedSerie = "";
let contentResults = "";
let animeResult = {};
let pasteFavorite = "";

//Defino la función de elegir series favoritas, la función myFavorites escucha el click sobre un elemento de los resultados y si existe en favoritos lo elimina, si no existe en favoritos lo añade.
function myFavorites(event) {
  const selectFavorite = event.currentTarget;
  // console.log(event.currentTarget)

  //Si el elemento sí contiene la clase que pone el cuadrito verde haz que se quite.
  //Quita el elemento de favoritos de la izquierda
  if (selectFavorite.matches(".selectedItem")) {
    let chapterId = selectFavorite.getAttribute("id");
    console.log(chapterId);
    const elementToDelete = document.querySelector(
      "ul.js_favoriteSeries #" + chapterId
    );
    console.log(elementToDelete);
    elementToDelete.remove();
    //Si el elemento no contiene la clase que pone el cuadrito verde haz que se añada.
  } else {
    pasteFavorite = selectFavorite.cloneNode(true);
    favoriteSeries.appendChild(pasteFavorite);
  }
  //Una vez he ejecutado la creación/eliminación del elemento, cambio el color del elemento clickado con toggle.
  selectFavorite.classList.toggle("selectedItem");
}

//Defino la función de búsqueda, cojo el string de la búsqueda y llamo a la API para que me muestre los resultados.
function searchAnime(event) {
  //evitamos que se recargue la página
  event.preventDefault();
  resultsSeries.innerHTML = ""; //Cojo los resultados anteriores y los borro
  fetch(`https://api.jikan.moe/v3/search/anime?q=${inputSearch.value}`)
    .then((response) => response.json())
    .then((data) => {
      const apiResults = data.results;
      console.log(apiResults.length);

      for (let i = 0; i < apiResults.length; i++) {
        animeResult = apiResults[i];

        //Sustituir imagen cuando la serie no tiene
        let imageAddress = "";
        if (animeResult.image_url != imageNotFound) {
          imageAddress = animeResult.image_url;
        } else {
          imageAddress = urlNoImage;
        }

        //comprobar si este capítulo está en favoritos y ponerlo en verde (con un if)
        let markFavorite = "";
        // if (¿existe?) {
        //   markFavorite = "selectedItem";
        // } else {
        // }

        resultsSeries.innerHTML += `<li class="js_itemResult ${markFavorite}" id="chapter-${animeResult.mal_id}"><p>${animeResult.title}</p><img src="${imageAddress}"/></li>`;
      }

      const allResults = document.querySelectorAll(".js_itemResult");

      for (const eachItem of allResults) {
        eachItem.addEventListener("click", myFavorites);
      }
    });
}

//Llamo a las funciones al clickar en los botones
searchButton.addEventListener("click", searchAnime);
