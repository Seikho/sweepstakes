import server = require('./server');
import initDb = require('./store/init');
var logger = require('ls-logger');

// Initialise the database
var createdDb = initDb();
if (createdDb) logger.info('Created database');

// Load front-end library routes and /front directory handler
require('./api/static');

server.start(() => logger.info('Started web server'));