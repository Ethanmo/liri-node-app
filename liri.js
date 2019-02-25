require("dotenv").config();
const fs = require('file-system');
const axios = require('axios');
const moment = require('moment');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


//console.log(spotifyKey);

//take command from input
var command = process.argv[2];

//save input search and trim 
var trimmedSearch;
function myTrim(){
    var inputArr = process.argv.slice(3);
    for (let i = 0; i < inputArr.length; i++){
        inputArr[i] = inputArr[i].replace(/\W/gm, '');
    }
    trimmedSearch = inputArr;
}

myTrim();

//var trimmedSearch = rawSearch.join('');

//console.log("search: " + trimmedSearch);
//console.log("command: " + command)


function findConcert(searchName){
    var searchQuery = searchName.join('');
    axios.get("https://rest.bandsintown.com/artists/" + searchQuery + "/events?app_id=codingbootcamp")
    .then(function (response) {
        //console.log(response);
        for (let i = 0; i < response.data.length; i++){
            var element = response.data[i];
            var displayData = "\n-Venue Name: " + element.venue.name + "\n-Location: " + element.venue.city + ', ' + 
                                element.venue.region + ', ' + element.venue.country + "\n-Date: " + moment(element.datetime).format("MM-DD-YYYY") + "\n";
            console.log(displayData);
            fs.appendFile('./log.txt', displayData, function(error){
                if (error){return console.log(error);}
            })
        }   
    }).catch(function (error) {
        console.log(error);
    });
}

function findSong(searchName){
    var searchQuery = searchName.join('');
    spotify.search({ type: 'track', query: searchQuery})
    .then(function(response){
        console.log(response);
    })
    .catch(function(err) {
        console.log(err);
    });
}
//findSong();

function findMovie(searchName){
    var movieQuery;
    if (searchName.length === 0) {
        movieQuery = "Mr+Nobody";
    } else {
        movieQuery= searchName.join('+');
    }
    console.log(movieQuery);
    axios.get("http://www.omdbapi.com/?t=" + movieQuery + "&apikey=ad2d6353")
    .then(function(response){
        var data = response.data;
        var displayData = "\n-Title: " + data.Title + "\n-Year: " + data.Year + "\n-IMDB Rating: " + data.imdbRating + 
                    "\n-Rotten Tomatoes Rating: " + data.Ratings[1].Value + "\n-Country: " + data.Country + "\n-Language: " + data.Language +
                    "\n-Plot: " + data.Plot + "\n-Actors: " + data.Actors + "\n\n";
        console.log(displayData);
        fs.appendFile('./log.txt', displayData, function(error){
            if (error){return console.log(error);}
        })
    })
    .catch(function(err){
        console.log(err);
    });
}

function readFromFile(){
    fs.readFile('./random.txt', "UTF8", function(err, data){
        if (err) {            
            throw err;
        }
        console.log(data);
        var fileArr = data.split(',');
        var command = fileArr[0];
        var trimmedSearch = fileArr[1].replace(/\W/g, '').split(' ');
        functionSelector(command, trimmedSearch);
    })
}

function functionSelector(command, userSearch){
    var commandInput = command.toLowerCase();
    if (commandInput === "concert-this") {
        findConcert(userSearch);
    } else if (commandInput === "spotify-this-song") {
        findSong(userSearch);
    } else if (commandInput === "movie-this") {
        findMovie(userSearch);
    } else if (commandInput === "do-what-it-says") {
        readFromFile();
    }
}

functionSelector(command, trimmedSearch);