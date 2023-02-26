let object={
  'keyOne':"One",
  "KeyTwo":2,
  "KeyThree":"Three",
  obj:{
    'KeyFour':"Four"
  }
}
let genres= [
  {
      "id": 28,
      "name": "Action"
  },
  {
      "id": 12,
      "name": "Adventure"
  },
  {
      "id": 16,
      "name": "Animation"
  },
  {
      "id": 35,
      "name": "Comedy"
  },
  {
      "id": 80,
      "name": "Crime"
  },
  {
      "id": 99,
      "name": "Documentary"
  },
  {
      "id": 18,
      "name": "Drama"
  },
  {
      "id": 10751,
      "name": "Family"
  },
  {
      "id": 14,
      "name": "Fantasy"
  },
  {
      "id": 36,
      "name": "History"
  },
  {
      "id": 27,
      "name": "Horror"
  },
  {
      "id": 10402,
      "name": "Music"
  },
  {
      "id": 9648,
      "name": "Mystery"
  },
  {
      "id": 10749,
      "name": "Romance"
  },
  {
      "id": 878,
      "name": "Science Fiction"
  },
  {
      "id": 10770,
      "name": "TV Movie"
  },
  {
      "id": 53,
      "name": "Thriller"
  },
  {
      "id": 10752,
      "name": "War"
  },
  {
      "id": 37,
      "name": "Western"
  }
]
console.log(Object.entries(object),'entries');
for(let {id,name} of genres){
  console.log(id,name,typeof genres);
}
let bigObj={
  "genres": [
      {
          "id": 28,
          "name": "Action"
      },
      {
          "id": 12,
          "name": "Adventure"
      },
      {
          "id": 16,
          "name": "Animation"
      },
      {
          "id": 35,
          "name": "Comedy"
      },
      {
          "id": 80,
          "name": "Crime"
      },
      {
          "id": 99,
          "name": "Documentary"
      },
      {
          "id": 18,
          "name": "Drama"
      },
      {
          "id": 10751,
          "name": "Family"
      },
      {
          "id": 14,
          "name": "Fantasy"
      },
      {
          "id": 36,
          "name": "History"
      },
      {
          "id": 27,
          "name": "Horror"
      },
      {
          "id": 10402,
          "name": "Music"
      },
      {
          "id": 9648,
          "name": "Mystery"
      },
      {
          "id": 10749,
          "name": "Romance"
      },
      {
          "id": 878,
          "name": "Science Fiction"
      },
      {
          "id": 10770,
          "name": "TV Movie"
      },
      {
          "id": 53,
          "name": "Thriller"
      },
      {
          "id": 10752,
          "name": "War"
      },
      {
          "id": 37,
          "name": "Western"
      }
  ]
}
function testing({genres}){
  let testObj={};
  for(let {id,name} of genres){
    console.log(id,name);
    testObj[id]=name;
  }
  console.log(testObj);
}
testing(bigObj);
let emptyObj={};
let array=[1,2,3,4,5,6,7,8,9,10];
for(let i=0;i<10;i++)
emptyObj[array[i]]='i';
console.log(emptyObj);
