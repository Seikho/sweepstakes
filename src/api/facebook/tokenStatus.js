var request = require('request');
var accessToken = require('./accessToken');
function debugToken(userToken, appToken) {
    var url = "https://graph.facebook.com/debug_token?input_token=" + userToken + "&access_token=" + appToken;
    var promise = new Promise(function (resolve, reject) {
        request.post(url, {}, function (err, res, body) {
            if (err)
                return reject(err);
            if (body.data.error)
                return reject(body.data.error);
            resolve(body);
        });
    });
    return promise;
}
module.exports = function get(userStatus) {
    return accessToken()
        .then(function (token) { return debugToken(userStatus.authResponse.accessToken, token); });
};
//# sourceMappingURL=tokenStatus.js.map