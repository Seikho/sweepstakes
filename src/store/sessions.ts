import db = require('./db');
import users = require('./users');

export function getByToken(token: FB.Status): Promise<Sweepstakes.UserSession> {
    return db('sessions')
        .select()
        .where({ token: token.authResponse.accessToken })
        .innerJoin('users', 'users.id', 'sessions.userId')
        .then(responses => responses[0]);
}

export function create(token: FB.Status) {
    users.getByFacebookId(token.authResponse.userID)
        
}

function createHandler(user?: Sweepstakes.User) {
    if (user) return Promise.resolve(user.id);
    
    return users.create(user.facebookId)
}