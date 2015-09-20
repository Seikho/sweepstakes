var db = require('./db');
var getFacebookUser = require('../api/facebook/user');
function get(id) {
    if (typeof id === 'number') {
        return getById(id);
    }
    else {
        return getByFacebookId(id);
    }
}
exports.get = get;
function getById(id) {
    return db('users')
        .select()
        .where('id', '=', id)
        .then(function (users) { return users[0]; });
}
exports.getById = getById;
function getByFacebookId(id) {
    return db('users')
        .select()
        .where('facebookId', '=', id)
        .then(function (users) { return users[0]; });
}
exports.getByFacebookId = getByFacebookId;
function create(facebookId) {
    var user = {
        name: null,
        facebookId: facebookId,
        entries: '[]',
        groups: '[]'
    };
    return getFacebookUser(facebookId)
        .then(function (fbUser) { return user.name = fbUser.name; })
        .then(function () { return db('users').insert(user); })
        .then(function (ids) { return ids[0]; });
}
exports.create = create;
function addUserGroup(id, groupId) {
    return get(id)
        .then(function (user) {
        var groups = JSON.parse(user.groups);
        var hasGroup = groups.some(function (g) { return g === groupId; });
        if (hasGroup)
            return Promise.resolve(true);
        groups.push(groupId);
        return updateGroups(user.id, groups);
    });
}
exports.addUserGroup = addUserGroup;
function removeUserGroup(id, groupId) {
    return get(id)
        .then(function (user) {
        var groups = JSON.parse(user.groups);
        var hasGroup = groups.some(function (g) { return g === groupId; });
        if (!hasGroup)
            return Promise.resolve(true);
        groups = groups.filter(function (g) { return g !== groupId; });
        return updateGroups(user.id, groups);
    });
}
exports.removeUserGroup = removeUserGroup;
function updateGroups(id, groups) {
    var newGroups = Array.isArray(groups)
        ? JSON.stringify(groups)
        : groups;
    return db('users')
        .update('groups', '=', newGroups)
        .where('id', '=', id)
        .then(function () { return true; })
        .catch(function () { return false; });
}
exports.updateGroups = updateGroups;
//# sourceMappingURL=users.js.map