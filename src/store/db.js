var knex = require('knex');
var path = require('path');
var location = require('./location');
var dbPath = path.resolve(__dirname, '../../sweepstakes.db');
var db = knex({
    client: 'sqlite3',
    connection: {
        filename: location.main
    }
});
module.exports = db;
//# sourceMappingURL=db.js.map