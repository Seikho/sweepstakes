var db = require('./db');
var users = require('./users');
var tokenStatus = require('../api/facebook/tokenStatus');
function isValid(token) {
    return getByToken(token)
        .then(function (session) { return !!session; });
}
exports.isValid = isValid;
function getByToken(token) {
    var authToken;
    if (typeof token === 'string')
        authToken = token;
    if (typeof token !== 'string')
        authToken = token.authResponse.accessToken;
    return db('sessions')
        .select()
        .where({ token: authToken })
        .innerJoin('users', 'users.id', 'sessions.userId')
        .then(function (responses) { return responses[0]; });
}
exports.getByToken = getByToken;
function create(token) {
    return getByToken(token)
        .then(function (session) {
        if (!!session)
            return Promise.resolve(true);
        return createHandler(token);
    });
}
exports.create = create;
function createHandler(token) {
    return tokenStatus(token)
        .then(function (status) {
        if (status.error)
            return Promise.reject('Unable to verify token: ' + status.error.message);
        return createSession(token);
    }).catch(function (err) { return Promise.reject(err); });
}
function createSession(token) {
    var storeSession = function (id) { return db('sessions')
        .insert({
        userId: id,
        token: token.authResponse.accessToken
    })
        .then(function () { return true; }); };
    var fbId = token.authResponse.userID;
    return users.get(fbId)
        .then(function (user) {
        if (!user)
            return users.create(fbId).then(storeSession);
        return storeSession(user.id);
    });
}
//# sourceMappingURL=sessions.js.map