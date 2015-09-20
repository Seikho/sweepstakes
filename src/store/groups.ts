import db = require('./db');

export function get(groups?: number[] | string) {
    var query = db('groups')
        .select()

    if (groups) {
        if (groups instanceof Array) query.whereIn('id', groups);
        else query.whereIn('id', JSON.parse(<string>groups));

    }
    return query.then((groups: Sweepstakes.Group[]) => groups)
}

export function getOne(groupId: number) {
    return db('groups')
        .select()
        .where('id', '=', groupId)
        .then((groups: Sweepstakes.Group[]) => groups[0]);
}

export function create(ownerId: number, name: string, description?: string): Promise<Sweepstakes.Group> {
    var owners = JSON.stringify([ownerId]);
    description = description || '';

    var group = {
        owners, name, description
    };

    return db('groups')
        .insert(group)
        .then(ids => {
            group['id'] = group;
            return <Sweepstakes.Group>group;
        });
}

export function addOwner(groupId: number, userId: number) {
    return getOne(groupId)
        .then(group => {
            var owners: number[] = JSON.parse(group.owners);
            var isInGroup = owners.some(id => id === userId);
            if (isInGroup) return Promise.resolve(true);

            owners.push(userId);
            return updateOwners(groupId, owners);
        });
}

export function removeOwner(groupId: number, userId: number) {
    return getOne(groupId)
        .then(group => {
            var owners: number[] = JSON.parse(group.owners);
            var isInGroup = owners.some(id => id === userId);           
            if (!isInGroup) return Promise.resolve(true);
            if (owners[0] === userId) return Promise.reject('Unable to remove original owner of a group');

            owners = owners.filter(o => o !== userId);
            return updateOwners(groupId, owners);
        });
}

function updateOwners(groupId: number, owners: number[]) {
    return db('groups')
        .update({ owners: JSON.stringify(owners) })
        .where('id', '=', groupId)
        .then(() => true)
        .catch(() => false);
}