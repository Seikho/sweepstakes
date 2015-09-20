var request = require('request');
var settings = require('../../store/settings');
var logger = require('ls-logger');
function tokenRequest(settings) {
    var options = {
        client_id: settings.client_id,
        client_secret: settings.secret,
        grant_type: 'client_credentials'
    };
    var tokenPromise = new Promise(function (resolve, reject) {
        request
            .post('https://graph.facebook.com/oauth/access_token', options, function (error, response, body) {
            if (error)
                return reject(error);
            var token = authCallback(body);
            if (token == null)
                return reject('Failed to generate auth token');
            resolve(token);
        });
    });
    return tokenPromise;
}
function authCallback(result) {
    try {
        var errorObject = JSON.parse(result);
        if (!!errorObject.error) {
            logger.error("Failed to generate Application Auth Token: " + errorObject.error.message);
            return null;
        }
        logger.error("Failed to generate Application Auth Token: Unexpected error: " + errorObject);
    }
    catch (ex) {
        var split = result.split('=');
        return result;
    }
}
module.exports = function getToken() {
    return settings.get()
        .then(tokenRequest);
};
//# sourceMappingURL=accessToken.js.map