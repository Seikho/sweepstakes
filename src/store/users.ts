import db = require('./db');
import getFacebookUser = require('../api/facebook/user');
import groups = require('./groups');

export function get(id: number | string) {
    if (typeof id === 'number') {
        return getById(id)
    } else {
        return getByFacebookId(id);
    }
}

export function getById(id: number): Promise<Sweepstakes.User> {
    return db('users')
        .select()
        .where('id', '=', id)
        .then(users => users[0]);
}

export function getByFacebookId(id: string): Promise<Sweepstakes.User> {
    return db('users')
        .select()
        .where('facebookId', '=', id)
        .then(users => users[0]);
}

export function create(facebookId: string): Promise<number> {
    var user = {
        name: null,
        facebookId,
        entries: '[]',
        groups: '[1]'
    }

    return getFacebookUser(facebookId)
        .then(fbUser => user.name = fbUser.name)
        .then(() => db('users').insert(user))
        .then(ids => ids[0])
}

export function addUserGroup(id: number | string, groupId: number): Promise<boolean> {
    return get(id)
        .then(user => {
            var groups: number[] = JSON.parse(user.groups);
            var hasGroup = groups.some(g => g === groupId);
            if (hasGroup) return Promise.resolve(true);

            groups.push(groupId);
            return updateGroups(user.id, groups);
        });
}

export function removeUserGroup(id: number | string, groupId: number): Promise<boolean> {
    return get(id)
        .then(user => {
            var groups: number[] = JSON.parse(user.groups);
            var hasGroup = groups.some(g => g === groupId);
            if (!hasGroup) return Promise.resolve(true);

            groups = groups.filter(g => g !== groupId);
            return updateGroups(user.id, groups);
        });
}

export function updateGroups(id: number, groups: number[] | string): Promise<boolean> {
    var newGroups = Array.isArray(groups)
        ? JSON.stringify(groups)
        : groups;

    return db('users')
        .update('groups', '=', newGroups)
        .where('id', '=', id)
        .then(() => true)
        .catch(() => false);
}

export function getUserGroups(userId: number) {
    return getById(userId)
        .then(user => groups.get(user.groups));
}

export function addEntry(userId: number | string, sweepstakeId: number, entry: any): Promise<boolean> {

    var saveEntry = (userId: number, entries: Sweepstakes.Entry[]) => db('users')
        .update({ entries: JSON.stringify(entries) })
        .where('id', '=', userId)
        .then(() => true);

    return get(userId)
        .then(user => {
            var entries: Sweepstakes.Entry[] = JSON.parse(user.entries);
            var hasEntry = entries.some(e => e.id === sweepstakeId);

            if (hasEntry) return Promise.reject('An entry has already been made');

            entries.push({
                id: sweepstakeId,
                value: JSON.stringify(entry)
            });

            return saveEntry(user.id, entries);
        });
}