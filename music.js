document.addEventListener('DOMContentLoaded', () => {
    const returnHomeButton = document.getElementById('return-home');
    returnHomeButton.addEventListener('click', () => {
        window.location.href = 'index.html'; 
    });

});


const genreToSpotifyURLs = {
    'Rap': [
        'https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd?si=123456',
        'https://open.spotify.com/embed/playlist/37i9dQZF1DX0Tkc6ltcBfU?si=a1db500ef88d4c24',
        'https://open.spotify.com/embed/playlist/37i9dQZF1DWUFmyho2wkQU?si=3d37fefd072c49fe',
        'https://open.spotify.com/embed/playlist/37i9dQZF1DWTl4y3vgJOXW?si=3c53d2e6d1ea4e6d',
        'https://open.spotify.com/embed/playlist/37i9dQZF1DX7e6SyPRzzx0?si=8e1b646269c54d5b'
    ],

    'Pop': [
        'https://open.spotify.com/embed/playlist/37i9dQZF1DX5gQonLbZD9s?si=04aa3093ba1e4653',
        'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?si=560dd26b26404c4e',
        'https://open.spotify.com/embed/playlist/37i9dQZF1DWSThc8QnzIme?si=122e8f2c61754c94',
        'https://open.spotify.com/embed/playlist/37i9dQZF1DX0kbJZpiYdZl?si=790986dbf4214019',
        'https://open.spotify.com/embed/playlist/37i9dQZF1DWWOGXILUAh53?si=337473973ee04f99',

    ],

    'K-Pop': [
        'https://open.spotify.com/embed/playlist/37i9dQZF1DX9tPFwDMOaN1?si=2765f9536999445e',
        'https://open.spotify.com/embed/playlist/37i9dQZF1DX4FcAKI5Nhzq?si=ddc998df4c4a46b1',
        'https://open.spotify.com/embed/playlist/37i9dQZF1DXe5W6diBL5N4?si=a93d6ca615db40d0',
        'https://open.spotify.com/embed/playlist/37i9dQZF1DX4IDaXtVjL83?si=b3308b2a211a4c34',
        'https://open.spotify.com/embed/playlist/37i9dQZF1DX9IALXsyt8zk?si=c8336efbcd4243a0'
    ],

    'Jazz': [
        'https://open.spotify.com/embed/playlist/37i9dQZF1DX7YCknf2jT6s?si=306f5cb256634694',
        'https://open.spotify.com/embed/playlist/37i9dQZF1DXcWL5K0oNHcG?si=ebcdbc4285304ee0',
        'https://open.spotify.com/embed/playlist/37i9dQZF1DWUb0uBnlJuTi?si=e1c2451e7ef149b6',
        'https://open.spotify.com/embed/playlist/37i9dQZF1DWTtzPKJEaTC4?si=1c2963c871f24726',
        'https://open.spotify.com/embed/playlist/37i9dQZF1DX55dNU0PWnO5?si=de2a759e7daa423a'

    ],

    'Reggaeton': [
        'https://open.spotify.com/embed/playlist/37i9dQZF1DX10zKzsJ2jva?si=b8346dc8c8824390',
        'https://open.spotify.com/embed/playlist/37i9dQZF1DWY7IeIP1cdjF?si=18b6454960b34fbd',
        'https://open.spotify.com/embed/playlist/37i9dQZF1DWSpF87bP6JSF?si=92b7c6635dd24d2e',
        'https://open.spotify.com/embed/playlist/37i9dQZF1DX8SfyqmSFDwe?si=bebc57148d4c428e',
        'https://open.spotify.com/embed/playlist/37i9dQZF1DX6ThddIjWuGT?si=6003ba34b34344af'
    ],

    'Country': [
        'https://open.spotify.com/embed/playlist/37i9dQZF1DX1lVhptIYRda?si=d697b90a56344a54',
        'https://open.spotify.com/embed/playlist/37i9dQZF1DX8S0uQvJ4gaa?si=e4000eeb97284747',
        'https://open.spotify.com/embed/playlist/37i9dQZF1DWVn8zvR5ROMB?si=96e837f243cd47ed',
        'https://open.spotify.com/embed/playlist/37i9dQZF1DXcArRh6x66oH?si=386dfc55f3b14822',
        'https://open.spotify.com/embed/playlist/37i9dQZF1DWZBCPUIUs2iR?si=ad982bc4900b46d3'
    ],

    'Lo-Fi': [
        'https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn?si=0b83ec0c2f6046ab',
        'https://open.spotify.com/embed/playlist/37i9dQZF1DXdLK5wjKyhVm?si=e382c27dd47b4275',
        'https://open.spotify.com/embed/playlist/37i9dQZF1DX4t95PAs1EpY?si=86e78879c34647dc',
        'https://open.spotify.com/embed/playlist/37i9dQZF1DWYoYGBbGKurt?si=bc3ca2c4f4af4ade',
        'https://open.spotify.com/embed/playlist/37i9dQZF1DX692WcMwL2yW?si=533d8e9f28a4410b'
    ]

};

function changeGenre(genre) {
    const spotifyPlayer = document.querySelector('.spotify-player-container iframe');
    const typingMessageInput = document.getElementById('ai-typing-message');

    if (genreToSpotifyURLs.hasOwnProperty(genre)) {
        const playlists = genreToSpotifyURLs[genre];
        const randomPlaylist = playlists[Math.floor(Math.random() * playlists.length)];

        // Simulate AI typing
        let message = `Selecting a ${genre} playlist for you...`;
        typingMessageInput.value = '';
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < message.length) {
                typingMessageInput.value += message.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => {
                    spotifyPlayer.src = randomPlaylist;
                    typingMessageInput.value = ''; 
                }, 1000);
            }
        }, 25); 

    } else {
        console.error("Genre not found in the mapping: " + genre);
    }
}






