const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
const fetch = require('node-fetch');

const twitterCredentials = {
    consumer_key: "Tc1hnj2TtH268sc2CvwypzpRI",
    consumer_secret: "sxCEFNUwTHIMaDiEqXNkAm5rpMXzJoqwofVNAfPWX9ZklTa5Yl",
    access_token: "1397456020264341506-Ztkthc0CIkCAx7TdQEUNj2El2SzemO",
    access_token_secret: "dZLppievgHqpZodf8vS9VIIY2KbkuEUK2HLkg7ViP6q0I"
};

function getTwitterFollowerCount() {
    const oauth = OAuth({
        consumer: {
            key: twitterCredentials.consumer_key,
            secret: twitterCredentials.consumer_secret
        },
        signature_method: 'HMAC-SHA1',
        hash_function(base_string, key) {
            return crypto.createHmac('sha1', key).update(base_string).digest('base64');
        }
    });

    const token = {
        key: twitterCredentials.access_token,
        secret: twitterCredentials.access_token_secret
    };

    const request_data = {
        url: 'https://api.twitter.com/1.1/users/show.json?screen_name=kelvin_kitonyo',
        method: 'GET'
    };

    const request_options = {
        method: request_data.method,
        headers: oauth.toHeader(oauth.authorize(request_data, token)),
    };

    return fetch(request_data.url, request_options)
        .then(response => response.json())
        .then(data => data.followers_count)
        .catch(error => {
            console.error('Error fetching Twitter follower count:', error);
            return null;
        });
}


getTwitterFollowerCount()
    .then(followerCount => {
        if (followerCount !== null) {
            console.log(`You have ${followerCount} followers on Twitter.`);
        }
    });
