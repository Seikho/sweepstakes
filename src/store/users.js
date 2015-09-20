var db = require('./db');
function get(id) {
    if (typeof id === 'number') {
        return getById(id);
    }
    else {
        return getByFacebookId(id);
    }
}
function getById(id) {
    return db('users')
        .select()
        .where('id', '=', id)
        .then(function (users) { return users[0]; });
}
function getByFacebookId(id) {
    return db('users')
        .select()
        .where('facebookId', '=', id)
        .then(function (users) { return users[0]; });
}
function create(facebookId, name) {
    var user = {
        name: name,
        facebookId: facebookId,
        entries: '[]',
        groups: '[]'
    };
    return db('users')
        .insert(user)
        .then(function (ids) { return ids[0]; });
}
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
//# sourceMappingURL=users.js.map