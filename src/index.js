var server = require('./server');
var initDb = require('./store/init');
var logger = require('ls-logger');
// Initialise the database
var createdDb = initDb();
if (createdDb)
    logger.info('Created database');
// Load front-end library routes and /front directory handler
require('./api/static');
// Load web api routes
require('./api/web');
server.start(function () { return logger.info('Started web server'); });
//# sourceMappingURL=index.js.map