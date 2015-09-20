import db = require('./db');
export = get;

function get(): Promise<Sweepstakes.Settings> {
    return db('settings')
        .select()        
        .then((settings: Sweepstakes.Settings[]) => settings[0]);
}