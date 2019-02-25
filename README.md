# liri-node-app

The Liri-node-app takes in command from either ternimal or a txt file. 
There're 4 commands available. 
    `concert-this`
    `spotify-this-song`
    `movie-this`
    `do-what-it-says`
-type in the title/band name/song name after the command in terminal, the app will retrieve infomation from Bands-in-town, spotify and OMDB api and display it in both terminal and log.txt.
-If there's non-letter/digit character in searching title, the app will automatically neglect it.
-Movie names must be correctly spaced. Otherwise OMDB will not return a valid result. This doesn't affect the other 2 command line functions.