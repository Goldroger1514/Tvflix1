'use strict';
import {api_key,imageBaseURL,fetchDataFromServer} from './api.js';
import {sidebar} from './sidebar.js';
import {createMovieCard} from './movie-card.js';
let pageContent=document.querySelector('[page-content]');
sidebar();
let getGenres=function(genreList){
  let newGenreList=[];
  for(let {name} of genreList){
    newGenreList.push(name);
  }
  return newGenreList.join(', ');
}
let getCast=function(castList){
  let newCastList=[];
  for(let i=0,len=castList.length;i<len && i<10;i++){
    let {name}=castList[i];
    newCastList.push(name);
  }
  return newCastList.join(', ');
}
let getDirectors=function(crewList){
  let newCrewList=[];
  crewList=crewList.filter(({job})=>job=='Director');
  for(let i=0,len=crewList.length;i<len&&i<10;i++){
    let {name}=crewList[i];
    newCrewList.push(name);
  }
  
  return newCrewList.join(', ');
}
let filterVideos=function(videoList){
  console.log(videoList);
  return videoList.filter(({type,site})=>(type=='Trailer'||type=='Teaser'&&(site=='YouTube')));
}
const movieId=localStorage.getItem('movieId');
fetchDataFromServer(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=en-US&append_to_response=casts,videos,images,releases0`,
function(movie){
  let {
    backdrop_path,
    poster_path,
    title,
    release_date,
    runtime,
    vote_average,
    genres,
    overview,
    casts:{
      cast,crew
    },
    videos:{
      results:videos
    }
  }=movie;
  document.title=`${title} - Tvflix`;
  let movieDetail=document.createElement('div');
  movieDetail.classList.add('movie-detail');
  movieDetail.innerHTML=`
  <div class="backdrop-image" style="background-image:url('${imageBaseURL}${"w1280" || "original"}${backdrop_path || poster_path}')" ></div>
      <figure class="poster-box movie-poster">
        <img src="${imageBaseURL}w342${poster_path}" alt="${title} Poster" class="img-cover">
      </figure>
      <div class="detail-box">
        <div class="detail-content">
          <h1 class="heading">${title}</h1>
          <div class="meta-list">
            <div class="meta-item">
              <img src="./assets/images/star.png" width="20" height="20" alt="Rating">
              <span class="span">${vote_average.toFixed(1)}</span>
            </div>
            <div class="separator"></div>
            <div class="meta-item">${runtime}</div>
            <div class="separator"></div>
            <div class="meta-item">${release_date.split('-')[0]}</div>
            <div class="meta-item card-badge"></div>
          </div>
          <p class="genre">${getGenres(genres)}</p>
          <p class="overview">${overview}</p>
          <ul class="detail-list">
            <div class="list-item">
              <p class="list-name">Starring</p>
              <p>${getCast(cast)}</p>
            </div>
            <div class="list-item">
              <p class="list-name">Directed By</p>
              <p>${getDirectors(crew)}</p>
            </div>
          </ul>
        </div>
        <div class="title-wrapper">
          <h3 class="title-large">Trailers and Clips</h3>
        </div>
        <div class="slider-list">
          <div class="slider-inner">

          </div>
        </div>
      </div>
  `;
  for(let {key,name} of filterVideos(videos)){
    let videoCard=document.createElement('div');
    videoCard.classList.add('video-card');
    videoCard.innerHTML=`
    <iframe width="500" height="294" 
    src="https://www.youtube.com/embed/${key}?&theme=dark&color=white&rel=0"
    frameborder="0" allowfullscreen="1" title="${name}" class="img-cover" loading="lazy" ></ifram>
    `;
    movieDetail.querySelector('.slider-inner').append(videoCard);
  }
  pageContent.append(movieDetail);
  fetchDataFromServer(`
  https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=489f7b75005de75c58b6cc0f3f9608e2&language=en-US&page=1`,
  addSuggestedMovies);
})
let addSuggestedMovies=function({results:movieList},title){
  let movieListElem=document.createElement('section');
  movieListElem.classList.add('movie-list');
  movieListElem.ariaLabel=`You May Also Like`;
  movieListElem.innerHTML=`
        <div class="title-wrapper">
          <h3 class="title-large">You may also like</h3>
        </div>
        <div class="slider-list">
          <div class="slider-inner">
          </div>
        </div>
  `;
  for(let movie of movieList){
    let movieCard=createMovieCard(movie);
    //called from movie_card.js
    movieListElem.querySelector('.slider-inner').append(movieCard);
  }
  pageContent.append(movieListElem);
}