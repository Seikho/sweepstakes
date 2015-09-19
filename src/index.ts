import * as server from './server';
var logger = require('ls-logger');
// Load front-end library routes and /front directory handler
require('./api/static');

server.start(() => logger.info('Started web server'));