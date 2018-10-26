require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node')
var eventEmitter = require('events');
var spotifyEmitter = new eventEmitter();

const download = require('image-downloader')

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
    console.log('The token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);
    console.log('The refresh token is ' + data.body['refresh_token']);

    // Set the access token on the API object to use it in later calls
    // spotifyApi.setAccessToken(data.body['access_token']);
    // spotifyApi.setRefreshToken(data.body['refresh_token']);
    spotifyApi.setAccessToken('BQDpLyZ2lV4jI6U8zFCl5Wg3adOZL49a45HcWsmZi0LjDwI3Kv4GYQEzu6PYmRu-OdKIMJW-tw_-dp7b8W5IchYK5X0-hjPx_W85e5QIlQ9HABK6Ecy-6yhusY7_-UovXTCLEyxJ5-AMcWdPNENq-e7GOwyaq5-HKYi-9U52cFMnpvgqrPrwqPcS');
    spotifyApi.setRefreshToken('AQDKR0tMnjc5NNtwR51KCd2iWzvpA8mviXdxwMdQ0JehdlLZUdwTPp2vAfig12zm7lGczZSVdr8-tcSd2kUo7qO68Z8iDAqqpTfwsduQH4HH7Xf8-4xts_i5tnBc1z9bNsqgiw');

    // do things
    spotifyApi.getMyCurrentPlayingTrack()
    .then(function(data) {
      // Output items
      console.log("Now Playing: ",data.body);
      var image = data.body.item.album.images[2].url;
      const options = {
          url: image,
          dest: 'images/cover.png'                  // Save to /path/to/dest/image.jpg
        }

        download.image(options)
          .then(({ filename, image }) => {
            console.log('File saved to', filename)
            spotifyEmitter.emit('now-playing', {
                track: data.body.item.name,
                artist: data.body.item.artists[0].name
            })
          })
          .catch((err) => {
            console.error(err)
          })
    }, function(err) {
      console.log('Something went wrong!', err);
    });
  },
  function(err) {
    console.log('Something went wrong when retrieving an access token', err);
  }

);
