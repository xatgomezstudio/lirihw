//GOOD CODE BABY

//Hiding keys n bag
require("dotenv").config();

//Global variables storing required files
var axios = require("axios");
var Spotify = require("node-spotify-api");
var fs = require("fs");

//I got the keys keys keys
var keys = require("./keys.js");
var omdbKey = "20523c31";
var spotify = new Spotify(keys.spotify);

//console spacer/divider
var divider =
  "\n\n------------------------------------------------------------\n\n";

//Positions n such
var command = process.argv[2];
var request = process.argv.slice(3).join(" ");

//Liri
function liri() {
  // Print whether searching for a movie or song, print the term as well
  // By default, if no search type is provided
  switch (command) {
    case "movie":
      if (request) {
        console.log("Searching for your youth...");
        omdbApi(request);
      } else {
        request = "Moonrise Kingdom";
        omdbApi();
      }
      break;
    case "song":
      if (request) {
        console.log("You should get a better taste in music...");
        spotifyApi(request);
      } else {
        request = "Finesse";
        spotifyApi();
      }
      break;
    case "concert":
      console.log(request);
      if (request) {
        console.log("You should get better friends...");
        getConcert(request);
      } else {
        request = "Tyler, The Creator";
        getConcert(request);
      }
      break;
  }
}

//Movie API function
function omdbApi() {
  axios
    .get("http://www.omdbapi.com/?apikey=" + omdbKey + "&t=" + request)
    .then(function(response) {
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
        "IMDB-Rating: " + jsonData.imdbrating
      ].join("\n\n");

      // Append showData and the divider to log.txt, print showData to the console
      fs.appendFile("log.txt", showData + divider, function(err) {
        if (err) throw err;
        console.log(divider + showData + divider);
      });
    });
}

function spotifyApi() {
  spotify
    .search({ type: "track", query: request, limit: 1 })
    .then(function(response) {
      //   console.log(response);
      console.log(
        "\n\n Artist: " +
          response.tracks.items[0].album.artists[0].name +
          "\n Song Name: " +
          response.tracks.items[0].name +
          "\n Album: " +
          response.tracks.items[0].album.name +
          "\n Spotify Link: " +
          response.tracks.items[0].external_urls.spotify +
          "\n\n"
      );
    })
    .catch(function(err) {
      console.log(err);
    });
}

function getConcert() {
  console.log(request);
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        request +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
      console.log(
        "\n\n Venue: " +
          response.data[0].venue.name +
          "\n City: " +
          response.data[0].venue.city +
          ", " +
          response.data[0].venue.country +
          "\n Date: " +
          response.data[0].datetime +
          "\n\n"
      );
    })
    .catch(function(error) {
      console.log(error);
    });
}

liri();
