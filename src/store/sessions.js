var db = require('./db');
var users = require('./users');
function getByToken(token) {
    return db('sessions')
        .select()
        .where({ token: token.authResponse.accessToken })
        .innerJoin('users', 'users.id', 'sessions.userId')
        .then(function (responses) { return responses[0]; });
}
exports.getByToken = getByToken;
function create(token) {
    users.getByFacebookId(token.authResponse.userID);
}
exports.create = create;
function createHandler(user) {
    if (user)
        return Promise.resolve(user.id);
    return users.create(user.facebookId);
}
//# sourceMappingURL=sessions.js.map