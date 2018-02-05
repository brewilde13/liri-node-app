// require and configure dotenv - this should happen as early as possible in your application
// links to you .env file that serves as your root directory
// process.env now holds the keys and values stored in your .env file
require("dotenv").config();

// variables to grab keys data and link to other node apps
var Twitter = require('twitter');
// var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require('./keys.js')

// define user inputs
var command = process.argv[2];
var liriRequest = process.argv[3];
for (var i =4; i< process.argv.length; i++) {
    liriRequest += ` + ${process.argv[i]}`
}
console.log(liriRequest);

// grabs and stores your protected API keys
// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// what function to return based on user input
switch (command) {
  case "my-tweets":
      getTweets();
      break;

  case "spotify-this-song":
      searchSong();
      break;
  case "movie-this":
        searchMovie()  
      break;
  default:
      break;
}

// grabs and logs the tweets from the users timeline
function getTweets() {
  var params = {screen_name: 'BrookeWildermu1'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
      for (var i = 0; i< tweets.length; i++){ 
      console.log(`tweet ${i+1}:`)     
      console.log(tweets[i].created_at);
      console.log(tweets[i].text);
      console.log("-----------------------")
      }
  }
  });
}

// node liri.js "spotify-this-song" will return
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
// If no song is provided then your program will default to "The Sign" by Ace of Base.

// // initialization to SPOTIFY API
// var Spotify = require('node-spotify-api');

// // grabs and stores your protected SPOTIFY keys
// var spotify = new Spotify(keys.spotify);

// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//  if (err) {
//    return console.log('Error occurred: ' + err);
//  }

// console.log(data);
// });

// node liri.js "movie-this <movie name here>" will return
// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
// OMBD Key = caa7449c

// node liri.js "do-what-it-says" should run spotify-this-song from random.txt