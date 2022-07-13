var chosenMovie;
var chosenRating;
var score = 0;
var highScore = 0;

function getHiscore() {
 var storedScore = localStorage.getItem('score');
  $("#high-score").text(storedScore)
}

newMovie();
getHiscore()

function newMovie(){
  fetch("https://imdb-api.com/en/API/BoxOfficeAllTime/k_7fvf648c")
  .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          // this is getting a random movie from an array of the top 200
            var array = data.items;
            var rand = array[Math.floor(Math.random() * data.items.length)];
            // rand.id, id is the imdb number iniside the object.. inside the array
            var chosenMovie = rand.id;
            if(!chosenMovie){
              return newMovie() 
            }
            console.log(chosenMovie);
            fetch(`https://imdb-api.com/en/API/Posters/k_7fvf648c/${chosenMovie}`)
            .then(function (res) {
                return res.json();
              })
              .then(function (data) {
                var chosenPoster = data.posters[0]
                // check if undefined ... newmovie
                if(!chosenPoster){
                  return newMovie()
                }
                $('.movie-display').attr('src', chosenPoster.link);
                  console.log(chosenPoster);
              fetch(`https://imdb-api.com/en/API/MetacriticReviews/k_7fvf648c/${chosenMovie}`)
              .then(function (res) {
                  return res.json();
                })
                .then(function (data) {
                  var chosenReview = data.items[0].content
                  if(!chosenReview){
                  return newMovie() 
                }
                  $('.review-container').text(chosenReview);
                    console.log(chosenReview);
                    fetch(`https://imdb-api.com/en/API/Ratings/k_7fvf648c/${chosenMovie}`)
              .then(function (res) {
                  return res.json();
                })
                .then(function (data) {
                  movieRating = data.rottenTomatoes
                    console.log(movieRating);
                })
                })
              })
        })
        .catch(function (err) {
          console.error(err);
        });
      }


        // this is the game over function... displays a gif and hides the movie poster 


function gameOver() {
  fetch('https://api.giphy.com/v1/gifs/search?api_key=OktUBveN25fs3J2IzfZK7c9OW6IKvTJM&q=bill+paxton+game+over&limit=1&offset=0&rating=pg-13&lang=en')
  .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
        var gameOverGif = data.data[0].images.fixed_height.url
        $('.movie-display').attr('src', gameOverGif);
        console.log(gameOverGif);

        // setting hiscore 

        if(score > highScore) {
          highScore = score 
          highScore = $("#high-score").text(score)
          localStorage.setItem('score', score);
          
        }
    })
  };


    // this is the game functionality 


$(".button").each(function(){
  $(this).click(function(event){
      if(movieRating >= event.target.dataset.min && movieRating <= event.target.dataset.max){

        // this is scores plus plus 

        score++
          $('#score').text(score);

// this is fetching a random gif for each successfull question answered 

        fetch('https://api.giphy.com/v1/gifs/random?api_key=OktUBveN25fs3J2IzfZK7c9OW6IKvTJM&tag=good+job%2C+celebrate%2C+cheer&rating=pg-13')
        .then(function (res) {
            return res.json();
          })
          .then(function (data) {
              var giphyUrl = data.data.images.fixed_height.url
              console.log(giphyUrl);
              $('#giphy-img').attr('src', giphyUrl);
              $('#giphy-img').removeClass('hidden')
              

          }) .catch(function (err) {
            console.error(err);
          });
        // giphyfunction()
        

        newMovie()
      }
      // score local storage if (score > x save to highscore)
      else {
        gameOver()

      }
      // game over giphy 
      // reset 
      console.log(this)
    })
  })
  
  // highScore = $("#high-score").text(score)
  // localStorage.setItem('score', highScore);