import db = require('./db');
import users = require('./users');
import tokenStatus = require('../api/facebook/tokenStatus');

export function isValid(token: FB.Status|string) {
    return getByToken(token)
        .then(session => !!session);
}

export function getByToken(token: FB.Status|string): Promise<Sweepstakes.UserSession> {
    var authToken: string;
    if (typeof token === 'string') authToken = token;
    if (typeof token !== 'string') authToken = token.authResponse.accessToken;
    
    return db('sessions')
        .select()
        .where({ token: authToken })
        .innerJoin('users', 'users.id', 'sessions.userId')
        .then(responses => responses[0]);
}

export function create(token: FB.Status): Promise<boolean> {
    return getByToken(token)
        .then(session => {
            if (!!session) return Promise.resolve(true);
            return createHandler(token);
        });
}

function createHandler(token: FB.Status) {
    return tokenStatus(token)
        .then(status => {
            if (status.error)
                return Promise.reject('Unable to verify token: ' + status.error.message);

            return createSession(token);
        }).catch(err => Promise.reject(err));

}

function createSession(token: FB.Status) {
    var storeSession = id => db('sessions')
        .insert({
            userId: id,
            token: token.authResponse.accessToken
        })
        .then(() => true)

    var fbId = token.authResponse.userID;

    return users.get(fbId)
        .then(user => {
            if (!user) return users.create(fbId).then(storeSession)
            return storeSession(user.id)
        });
}