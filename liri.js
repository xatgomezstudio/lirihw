//Hiding keys n bag
require("dotenv").config();
//Global variables storing required files
var axios = require("axios");
var Spotify = require("node-spotify-api");
var spotify = new Spotify({
    id: "4c25037bfdcb41b2bc231c354677eae3",
    secret: "e50f43b8c963423bb5bc1a19d988818c"
  });
var moment = require("moment");
var fs = require("fs");
//I got the keys keys keys
var key = require("./keys.js");
var spotifyKey = "20523c31";

//Positions n such
var command = process.argv[2];
var request = process.argv.slice(3).join(" ");

//Movie API function 

function movieApi(movie){

    var divider = "\n------------------------------------------------------------\n\n";

    axios.get('http://www.omdbapi.com/?apikey=' + spotifyKey + '&t=' + movie)
  .then(function (response) {

    var jsonData = response.data;

    // showData ends up being the string containing the show data we will print to the console
    var showData = [
      "Title: " + jsonData.Title,
      "Year: " + jsonData.Year,
      "Rating: " + jsonData.Rated,
      "Genre: " + jsonData.Genre,
      "Director: " + jsonData.Director,
      "Plot: " + jsonData.Plot,
      "Awards: " + jsonData.Awards,
      "IMDB-Rating: " + jsonData.imdbrating,

    ].join("\n\n");

    // Append showData and the divider to log.txt, print showData to the console
    fs.appendFile("log.txt", showData + divider, function(err) {
      if (err) throw err;
      console.log(showData);
    });
  });
};

spotifyApi("make that cake");


//Spotify API function

function spotifyApi(song) {
 
spotify.search({ type: 'track', query: song }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(JSON.stringify(data, null, 2)); 
});

}