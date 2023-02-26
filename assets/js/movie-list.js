'use strict';
import {api_key,imageBaseURL,fetchDataFromServer} from './api.js';
import {createMovieCard} from './movie-card.js';
import {sidebar} from './sidebar.js';
import {search} from './search.js';

let pageContent=document.querySelector("[page-content]");
sidebar();
// collect genre name & url parameter from localStorage
let genreName=localStorage.getItem('genreName');
let urlParam=localStorage.getItem('urlParam');
let currentPage=1;
let totalPages=0;
let fetchUrl=`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}&${urlParam}`;
fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}&${urlParam}`,
function({results:movieList,total_pages}){
  console.log(movieList);
  totalPages=total_pages;
  document.title=`${genreName} Movies - Tvflix`;
  let movieListElem=document.createElement('section');
  movieListElem.classList.add('movie-list','genre-list');
  movieListElem.ariaLabel=`${genreName} Movies`;
  movieListElem.innerHTML=`
  <div class="title-wrapper">
  <p class='label'>Results For:</p>
  <h1 class="heading">All ${genreName} Movies</h1>
</div>
<div class="grid-list"> 
</div>
<button class="btn load-more" load-more>Loard More</button>
  `;
  /**
   * Add movie card based on fetched item
   */
  for(let movie of movieList){
    let movieCard=createMovieCard(movie);
    movieListElem.querySelector('.grid-list')
    .append(movieCard);
  }
  pageContent.append(movieListElem);
  // Load more button
  document.querySelector("[load-more]").addEventListener('click',function(){
    if(currentPage>=totalPages){
      this.style.display='none';
      return;
    }
    currentPage++;
    this.classList.add('loading');
    fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}&${urlParam}`,({results:movieList})=>{
      this.classList.remove('loading')
      for(let movie of movieList){
        let movieCard=createMovieCard(movie);
        movieListElem.querySelector('.grid-list').append(movieCard);
      }
    })
  })
});
search();