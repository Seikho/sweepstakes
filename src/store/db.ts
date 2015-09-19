import knex = require('knex');
import path = require('path');
import location = require('./location');
export = db;

var dbPath = path.resolve(__dirname, '../../sweepstakes.db');

var db = knex({
    client: 'sqlite3',
    connection: {
        filename: location.main
    }  
});