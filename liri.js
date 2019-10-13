/********************************** 
        IMPORTS & VARIABLES
**********************************/

require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs")
var moment = require("moment");
var command = process.argv[2];
var arg = process.argv.slice(3).join(" ");

/********************************** 
        FUNCTION CALLS
**********************************/

switch(command){
    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;
    
    case "do-what-it-says":
        doWhatItSays();
        break;
}

/********************************** 
            FUNCTIONS
**********************************/

// Searches for next date and location of concert for artist that is entered
function concertThis(){

  var artist = arg;
  
  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
    function(response) {
      console.log("____________________________________________\n");
      console.log("Venue Name: " + response.data[0].venue.name);
      console.log("Venue location: " + response.data[0].venue.city + ", " + response.data[0].venue.country);
      // Retreivs the date from the bandsintown api, converts it to MM/DD/YYYY format using moment module
      console.log("Date: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

// Searches for #1 result of song searched
function spotifyThisSong(){
  var query = arg;
  spotify.search({ type: 'track', query: arg, limit: 1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

  console.log("____________________________________________\n");
  console.log("Artists: " + data.tracks.items[0].album.artists[0].name);
  console.log("Song: " + data.tracks.items[0].name);
  console.log("Preview Link: " + data.tracks.items[0].preview_url);
  console.log("Album: " + data.tracks.items[0].album.name);
  });
}

// Searches for movie searched
function movieThis(){
  // If nothing is input, set movie to Mr. Nobody
  if(!arg)
      arg = "Mr. Nobody";

  axios.get("http://www.omdbapi.com/?t=" + arg + "&y=&plot=short&apikey=f9571152").then(
      function(response) {
        console.log("____________________________________________\n");
        console.log("* Title of the movie: " + response.data.Title);
        console.log("* Year the movie came out: " + response.data.Year);
        console.log("* IMDB Raiting of the movie: " + response.data.Ratings[0].Value);
        console.log("* Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
        console.log("* Country(ies) where the movie was produced: " + response.data.Country);
        console.log("* Language of the movie: " + response.data.Language);
        console.log("* Plot of the movie: " + response.data.Plot);
        console.log("* Actors in the movie: " + response.data.Actors);
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
}

// Reads in command from text file --> movie-this, Interstellar
function doWhatItSays(){

  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) 
      return console.log(err);
    
    var dataArr = data.split(",");
    command = dataArr[0];
    arg = dataArr[1];
    
    switch(command){
      case "concert-this":
          concertThis();
          break;
  
      case "spotify-this-song":
          spotifyThisSong();
          break;
  
      case "movie-this":
          movieThis();
          break;
      
      case "do-what-it-says":
          doWhatItSays();
          break;
    }
  });
}