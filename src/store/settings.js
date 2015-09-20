var db = require('./db');
function get() {
    return db('settings')
        .select()
        .then(function (settings) { return settings[0]; });
}
exports.get = get;
function setSecret(secret) {
    return db('settings')
        .update({ secret: secret })
        .then(function () { return true; })
        .catch(function () { return false; });
}
exports.setSecret = setSecret;
//# sourceMappingURL=settings.js.map