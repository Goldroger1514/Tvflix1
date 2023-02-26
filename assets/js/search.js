'use strict';
import {api_key,fetchDataFromServer} from './api.js';
import {createMovieCard} from './movie-card.js';
export function search(){
  let searchWrapper=document.querySelector('[search-wrapper]');
  let searchField=document.querySelector('[search-field]');
  let searchResultModal=document.createElement('div');
  searchResultModal.classList.add('search-modal');
  document.querySelector('main').append(searchResultModal);
  let searchTimeout;
  searchField.addEventListener('input',function(){
    if(!searchField.value.trim()){
      searchResultModal.classList.remove('active');
      searchWrapper.classList.remove('searching');
      clearTimeout(searchTimeout);
      return;
    }
    searchWrapper.classList.add('searching');
    clearTimeout(searchTimeout);
    searchTimeout=setTimeout(function(){
      fetchDataFromServer(`https://api.themoviedb.org/3/search/movie?api_key=489f7b75005de75c58b6cc0f3f9608e2&language=en-US&query=${searchField.value}&page=1&include_adult=false`,
      function ({results:movieList}){
        searchWrapper.classList.remove('searching');
        searchResultModal.classList.add('active');
        searchResultModal.innerHTML=``;
        searchResultModal.innerHTML=`
      <div class="title-wrapper">
      <p class='label'>Results For:</p>
        <h1 class="heading">${searchField.value}</h1>
      </div>
      <div class="grid-list"> 
      </div>
      <button class="btn load-more" load-more>Loard More</button>
        `;
        for(let movie of movieList){
          let movieCard=createMovieCard(movie);
          searchResultModal.querySelector('.grid-list').append(movieCard);
        }
      }
      )
    },500);
  })
}