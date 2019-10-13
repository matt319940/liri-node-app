# liri-node-app

## Summary: This program take in 4 commands, each pertaining to a function that performs a specialized task. 

## Commands/Functions:
    1. concert-this:
        *   This command calls the concertThis() function which takes in 1 argument; that argument being a band/\nsinger's name. It then provides information on the venue name, location, and date of the band/\nsinger's next concert. 

    2. spotify-this-song:
        *   This command calls the spotifyThisSong() function which takes 1 argument; that argument being a song name. It then provides about the song, album, and artist along with a link to a 30 second preview of the song. 

    3. movie-this:
        *   This command calls the movieThis() function which takes 1 or no arguments. If an argument is entered, the argument being a movie's title, it provides information on the movie such as the movie's ratings from various sources, cast, and a short description of the movie. If an argument is not entered, it searches for the movie "Mr. Nobody" by default. 

    4. do-what-it-says:
        *   This command calls the doWhatItSays() funciton which takes no arguments. This function reads in a separate command and argument from a text file, which calls one of the 3 above functions along with a corresponding argument. 
