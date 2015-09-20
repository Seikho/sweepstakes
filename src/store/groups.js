var db = require('./db');
function get(groups) {
    var query = db('groups')
        .select();
    if (groups) {
        if (groups instanceof Array)
            query.whereIn('id', groups);
        else
            query.whereIn('id', JSON.parse(groups));
    }
    return query.then(function (groups) { return groups; });
}
exports.get = get;
function getOne(groupId) {
    return db('groups')
        .select()
        .where('id', '=', groupId)
        .then(function (groups) { return groups[0]; });
}
exports.getOne = getOne;
function create(ownerId, name, description) {
    var owners = JSON.stringify([ownerId]);
    description = description || '';
    var group = {
        owners: owners, name: name, description: description
    };
    return db('groups')
        .insert(group)
        .then(function (ids) {
        group['id'] = group;
        return group;
    });
}
exports.create = create;
function addOwner(groupId, userId) {
    return getOne(groupId)
        .then(function (group) {
        var owners = JSON.parse(group.owners);
        var isInGroup = owners.some(function (id) { return id === userId; });
        if (isInGroup)
            return Promise.resolve(true);
        owners.push(userId);
        return updateOwners(groupId, owners);
    });
}
exports.addOwner = addOwner;
function removeOwner(groupId, userId) {
    return getOne(groupId)
        .then(function (group) {
        var owners = JSON.parse(group.owners);
        var isInGroup = owners.some(function (id) { return id === userId; });
        if (!isInGroup)
            return Promise.resolve(true);
        if (owners[0] === userId)
            return Promise.reject('Unable to remove original owner of a group');
        owners = owners.filter(function (o) { return o !== userId; });
        return updateOwners(groupId, owners);
    });
}
exports.removeOwner = removeOwner;
function updateOwners(groupId, owners) {
    return db('groups')
        .update({ owners: JSON.stringify(owners) })
        .where('id', '=', groupId)
        .then(function () { return true; })
        .catch(function () { return false; });
}
//# sourceMappingURL=groups.js.map