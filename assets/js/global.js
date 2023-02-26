/**
 * Add event on multiple elements
 */
let addEventOnElements=function(elements,eventType,callback){
  for(let elem of elements)
  elem.addEventListener(eventType,callback);
};
/**
 * Toggle search box in mobile devices || small screens
 */
let searchBox=document.querySelector('[search-box]');
let searchTogglers=document.querySelectorAll('[search-toggler]');
addEventOnElements(searchTogglers,'click',function(){
  searchBox.classList.toggle('active');
})
function sayHello(){
  return 'Hello';
}
/**
 * set movieId in localStorage when you click any movie card
 */
let getMovieDetail=function(movieId){
  localStorage.setItem('movieId',String(movieId));
}
let getMovieList=function(urlParam,genreName){
  console.log(urlParam);
  localStorage.setItem('urlParam',urlParam);
  localStorage.setItem('genreName',genreName);
}