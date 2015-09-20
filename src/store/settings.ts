import db = require('./db');

export function get(): Promise<Sweepstakes.Settings> {
    return db('settings')
        .select()
        .then((settings: Sweepstakes.Settings[]) => settings[0]);
}

export function setSecret(secret: string): Promise<boolean> {
    return db('settings')
        .update({ secret })
        .then(() => true)
        .catch(() => false);
}