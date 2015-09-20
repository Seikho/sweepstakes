import db = require('./db');
import sessions = require('./sessions');
import users = require('./users');

export function get(userId?: number): Promise<Sweepstakes.Sweepstakes[]> {
    var query = db('sweepstakes')
        .select();

    if (userId == null) return query.then(ss => ss);
    return users.get(userId)
        .then(user => {
            var groups = JSON.parse(user.groups);
            return query.whereIn('groupId', groups)
                .then(ss => ss);
        });

}

export function create(name: string, description: string, groupId: number, options?: any): Promise<number> {
    options = options || {};
    description = description || '';
    
    return db('sweepstakes')
        .insert({
            name,
            description,
            groupId,
            state: Sweepstakes.SweepstakeState.Active,
            options: JSON.stringify(options)
        })
        .then(ids => ids[0]);
}