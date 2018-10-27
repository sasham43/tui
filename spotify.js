require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node')
var eventEmitter = require('events');
var spotifyEmitter = new eventEmitter();

// const download = require('image-downloader')
const imageToAscii = require("image-to-ascii");

var clientId = process.env.SPOTIFY_ID,
  clientSecret = process.env.SPOTIFY_SECRET;

  console.log('client', clientId, clientSecret);

// Create the api object with the credentials
var spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: 'http://localhost:3009/callback/'
});

// The code that's returned as a query parameter to the redirect URI
var code = 'AQCJfzNPZrmAZcarvZKsTotUSAgpwni_gWsVRS0xuvLFKskgFRuni4Y7PfAlw5MkmZNKl7beUiSDd8vkcKetgqHnEc_N9auW_8wIZ0Nxv6PXGh9LcjgqbvxEzZZthWE_CJhxYOu1cHpg8v4FqNrFfvMRZotdlJ4mOaz7EKp4Fv_FBCe1pcLPbDEE_D6cVZM12EDn7Uif5NJEH590SpleSyjnJJtq2q1sXWWHYf53shLJ6knERWb-uAASNSYkn1Gv9dyI5_GnaIGT-xE9zjXZc3YVrKkw0jRLNR1fZ41iCksYtELawmSoevmGdSIEb574BcuswBqPb9fiXcVX2BL4YbyQqJN8el9jUfnA6uGkZiv4sKiUhLMAS4zfgtOFm1FeTdSsmJcC80EgfVxJYvSg3JEe5KtZU6x_-uSWnpmx131RP8nEFNMwYcZR';

// Retrieve an access token.
spotifyApi.clientCredentialsGrant(code).then(
  function(data) {
    // console.log('The token expires in ' + data.body['expires_in']);
    // console.log('The access token is ' + data.body['access_token']);
    // console.log('The refresh token is ' + data.body['refresh_token']);

    // Set the access token on the API object to use it in later calls
    // spotifyApi.setAccessToken(data.body['access_token']);
    // spotifyApi.setRefreshToken(data.body['refresh_token']);
    spotifyApi.setAccessToken('BQDW0npMFgQDqJPHxR5jSn7LV4TjhFKMkplv_PUAvCk6HXPgh9SxFwUzcq9P7LbbScMPQH7PnHlyGM3s55ZkMpSyLEZ0M24CAfx7eSh85SeHaJxb3VK_PY0pJG9AOwGvPujebcgkQIjy_enf_6IGs6QNq3uKWwrvz8Pg6u2mgmgB8P-R-APbuSGI');
    spotifyApi.setRefreshToken('AQCN7kSO5JvxQL0Z_saGYluzlTPFQyWjDgc1_daEPIsUXxznFIqACBwVh6H5uFWYZl25n_5y1oJW0dZMgBhQn62NjVsbIt0fZVgcfUDmfqBxhMCN71O5YyR1U-_qLve76lcn3w');

    spotifyApi.refreshAccessToken().then(
      function(data) {
        // console.log('The access token has been refreshed!');

        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);
        // do things
        getTrack();
      },
      function(err) {
        console.log('Could not refresh access token', err);
      }
    );
  },
  function(err) {
    console.log('Something went wrong when retrieving an access token', err);
  }

);

function getTrack(){
    spotifyApi.getMyCurrentPlayingTrack()
    .then(function(data) {
        // console.log('got track');
      var image = data.body.item.album.images[2].url;
        // The path can be either a local path or an url
        imageToAscii(image, {
            size: {
                height: 24
            }
        }, (err, converted) => {
              spotifyEmitter.emit('now-playing', {
                  track: data.body.item.name,
                  artist: data.body.item.artists[0].name,
                  image: converted
              })
        });
    }, function(err) {
      console.log('Something went wrong!', err);
    });
}

module.exports = {
    spotifyEmitter,
    getTrack
}
