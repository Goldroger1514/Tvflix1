'use strict';
let api_key='489f7b75005de75c58b6cc0f3f9608e2';
let imageBaseURL='https://image.tmdb.org/t/p/';
// Fetch data from a server using the 'url' and passes 
// the results in JSON data to a 'callback' function
// along with an aptional parameter if has 'optionalParam'
let fetchDataFromServer=function(url,callback,optionalParam=''){
  fetch(url).then(response=>response.json()).then(
    data=>callback(data,optionalParam));
}
export {imageBaseURL,api_key,fetchDataFromServer};