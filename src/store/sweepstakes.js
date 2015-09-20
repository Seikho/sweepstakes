var db = require('./db');
var users = require('./users');
function get(userId) {
    var query = db('sweepstakes')
        .select();
    if (userId == null)
        return query.then(function (ss) { return ss; });
    return users.get(userId)
        .then(function (user) {
        var groups = JSON.parse(user.groups);
        return query.whereIn('groupId', groups)
            .then(function (ss) { return ss; });
    });
}
exports.get = get;
function create(name, description, groupId, options) {
    options = options || {};
    description = description || '';
    return db('sweepstakes')
        .insert({
        name: name,
        description: description,
        groupId: groupId,
        state: 1 /* Active */,
        options: JSON.stringify(options)
    })
        .then(function (ids) { return ids[0]; });
}
exports.create = create;
//# sourceMappingURL=sweepstakes.js.map