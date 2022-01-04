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
let apiResults = [];
let imageAddress = "";
let markFavorite = "";

// Defino el array para seleccionar favoritos
let arrayFavorites = [];

//Defino la función que marca como favoritos los resultados de búsqueda
function markGreen() {
  //comprobar si este capítulo está en favoritos y ponerlo en verde (con un if)
  markFavorite = "";
  const chapterFound = arrayFavorites.findIndex(
    (arrayFavorite) => arrayFavorite.mal_id === animeResult.mal_id
  );
  //si el capítulo existe (chapterFound!=-1) píntalo verde
  if (chapterFound != -1) {
    markFavorite = "selectedItem";
  } else {
  }
}

//Defino la función que sustituye la imagen cuando la serie no tiene
function substituteImage() {
  imageAddress = "";
  if (animeResult.image_url != imageNotFound) {
    imageAddress = animeResult.image_url;
  } else {
    imageAddress = urlNoImage;
  }
}

//Defino la función que pinta el array de favoritos
function paintFavorites() {
  favoriteSeries.innerHTML = "";
  console.log(arrayFavorites.length);
  for (let i = 0; i < arrayFavorites.length; i++) {
    let favoriteItem = arrayFavorites[i];
    favoriteSeries.innerHTML += `<li class="js_itemResult" id="${favoriteItem.mal_id}"><p>${favoriteItem.title}</p><img src="${favoriteItem.image_url}"/></li>`;
  }
}

//Defino la función de elegir series favoritas, la función myFavorites escucha el click sobre un elemento de los resultados y si existe en favoritos lo elimina, si no existe en favoritos lo añade.
function myFavorites(event) {
  const selectFavorite = event.currentTarget;
  const selectFavoriteId = parseInt(event.currentTarget.dataset.id);

  //Si el elemento sí contiene la clase que pone el cuadrito verde haz que se quite.
  //Quita el elemento de favoritos de la izquierda
  if (selectFavorite.matches(".selectedItem")) {
    const myFavoriteChapter = arrayFavorites.find(
      (arrayFavorite) => arrayFavorite.mal_id === selectFavoriteId
    );
    console.log(myFavoriteChapter);
    const index = arrayFavorites.indexOf(myFavoriteChapter);
    console.log(index);
    arrayFavorites.splice(index,1);
    paintFavorites();
    //Si el elemento no contiene la clase que pone el cuadrito verde haz que se añada.
  } else {
    const myFavoriteChapter = apiResults.find(
      (apiResult) => apiResult.mal_id === selectFavoriteId
    );
    arrayFavorites.push(myFavoriteChapter);
    paintFavorites();
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
      apiResults = data.results;
      console.log(apiResults.length);
      for (let i = 0; i < apiResults.length; i++) {
        animeResult = apiResults[i];
        substituteImage();
        markGreen();
        resultsSeries.innerHTML += `<li class="js_itemResult ${markFavorite}" data-id="${animeResult.mal_id}"><p>${animeResult.title}</p><img src="${imageAddress}"/></li>`;
      }
      const allResults = document.querySelectorAll(".js_itemResult");
      for (const eachItem of allResults) {
        eachItem.addEventListener("click", myFavorites);
      }
    });
}

//Llamo a las funciones al clickar en los botones
searchButton.addEventListener("click", searchAnime);
