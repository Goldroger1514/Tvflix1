'use strict';
import{api_key,fetchDataFromServer,imageBaseURL} from './api.js';
export function sidebar(){
  let genreList={
    // asString(genreIdList){
    //   let newGenreList=[];
    //   for(let genreId of genreIdList){
    //     newGenreList.push(this[genreId]);
    //   }
    //   console.log(newGenreList);
    //   return newGenreList.join(', ');
    // }
  };
  fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`,function({genres}){
    for(let {id,name} of genres){
      genreList[id]=name;
    }
    genreLink();
  });
  let sidebarInner=document.createElement('div');
  sidebarInner.classList.add('sidebar-inner');
  sidebarInner.innerHTML=`
  <div class="sidebar-list">
        <p class="title">Genre</p>
        
      </div>
      <div class="sidebar-list">
        <p class="title">Language</p>
        <a href="./movie-list.html" onclick='getMovieList("with_original_language=en","English")' menu-close class="sidebar-link">English</a>
        <a href="./movie-list.html" onclick='getMovieList("with_original_language=ar","Arabic")' menu-close class="sidebar-link">Arabic</a>
        <a href="./movie-list.html" onclick='getMovieList("with_original_language=fr","French")' menu-close class="sidebar-link">French</a>
        <a href="./movie-list.html" onclick='getMovieList("with_original_language=hi","Hindi")' menu-close class="sidebar-link">Hindi</a>
      </div>
      <div class="sidebar-footer">
        <p class="copyright">
          Copyright 2023 <a href="https://youtube.com/@codewithshadee">codewithshadee</a>
        </p>
        <img src="./assets/images/tmdb-logo.svg" height="17" width="140" alt="The movie database logo">
      </div>
  `;
  let genreLink=function(){
    for(let [genreId,genreName] of Object.entries(genreList)){
      let link=document.createElement('a');
      link.classList.add('sidebar-link');
      link.setAttribute('href','./movie-list.html');
      link.setAttribute('menu-close','');
      link.setAttribute('onclick',`getMovieList("with_genres=${genreId}","${genreName}")`);
      link.textContent=genreName;
      sidebarInner.querySelectorAll('.sidebar-list')[0].append(link);
    }
    let sidebar=document.querySelector('[sidebar]');
    sidebar.append(sidebarInner);
    toggleSidebar(sidebar);
  }
  let toggleSidebar=function(sidebar){
    /**
     * Toggle sidebar in mobile screen
     */
    let sidebarBtn=document.querySelector('[menu-btn]');
    let sidebarTogglers=document.querySelectorAll('[menu-toggler]');
    let sidebarClose=document.querySelectorAll('[menu-close]');
    let overlay=document.querySelector('[overlay]');
    addEventOnElements(sidebarTogglers,'click',function(){
      sidebar.classList.toggle('active');
      sidebarBtn.classList.toggle('active');
      overlay.classList.toggle('active');
    })
    addEventOnElements(sidebarClose,'click',function(){
      sidebar.classList.remove('active');
      sidebarBtn.classList.remove('active');
      overlay.classList.remove('active');
    })
  }
}