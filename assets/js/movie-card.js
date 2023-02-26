'use strict';
import {imageBaseURL} from './api.js';
export function createMovieCard(movie){
  let {
    poster_path,
    title,
    vote_average,
    release_date,
    id
  }=movie;
  let card=document.createElement('div');
  card.classList.add('movie-card');
  card.innerHTML=`
  <figure class="poster-box card-banner">
    <img src="${imageBaseURL}w342${poster_path}" class="img-cover" alt="${title}">
  </figure>
  <h4 class="title">${title}</h4>
  <div class="meta-list">
    <div class="meta-item">
      <img src="./assets/images/star.png" width="20" height="20" alt="Rating" loading="lazy">
      <span class="span">${vote_average.toFixed(1)}</span>
    </div>
  <div class="card-badge">${release_date.split('-')[0]}</div>
  </div>
  <a onclick='getMovieDetail(${id})' href="./detail.html" title="${title}" class="card-btn"></a>
  `;
  return card;
}