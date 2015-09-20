import db = require('./db');

function get(id: number | string) {
    if (typeof id === 'number') {
        return getById(id)
    } else {
        return getByFacebookId(id);
    }
}

function getById(id: number): Promise<Sweepstakes.User> {
    return db('users')
        .select()
        .where('id', '=', id)
        .then(users => users[0]);
}

function getByFacebookId(id: string): Promise<Sweepstakes.User> {
    return db('users')
        .select()
        .where('facebookId', '=', id)
        .then(users => users[0]);
}

function create(facebookId: string, name: string): Promise<number> {
    var user = {
        name,
        facebookId,
        entries: '[]',
        groups: '[]'
    }

    return db('users')
        .insert(user)
        .then(ids => ids[0]);
}

function addUserGroup(id: number | string, groupId: number): Promise<boolean> {
    return get(id)
        .then(user => {
            var groups: number[] = JSON.parse(user.groups);
            var hasGroup = groups.some(g => g === groupId);
            if (hasGroup) return Promise.resolve(true);

            groups.push(groupId);
            return updateGroups(user.id, groups);
        });
}

function removeUserGroup(id: number | string, groupId: number): Promise<boolean> {
    return get(id)
        .then(user => {
            var groups: number[] = JSON.parse(user.groups);
            var hasGroup = groups.some(g => g === groupId);
            if (!hasGroup) return Promise.resolve(true);

            groups = groups.filter(g => g !== groupId);
            return updateGroups(user.id, groups);
        });
}

function updateGroups(id: number, groups: number[] | string): Promise<boolean> {
    var newGroups = Array.isArray(groups)
        ? JSON.stringify(groups)
        : groups;

    return db('users')
        .update('groups', '=', newGroups)
        .where('id', '=', id)
        .then(() => true)
        .catch(() => false);
}