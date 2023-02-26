'use strict';
/**
 * Add event on multiple elements
 */
let addEventOnElements=function(elements,eventType,callback){
  for(let elem of elements)
  elem.addEventListener(eventType,callback);
}
/**
 * Toggle search box in mobile device || small screen
 */
let searchBox=document.querySelector('.search-box');
let searchTogglers=document.querySelectorAll('[search-toggler]');
addEventOnElements(searchTogglers,'click',function(){
  searchBox.classList.toggle('active');
})