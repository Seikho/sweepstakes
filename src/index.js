var server = require('./server');
var logger = require('ls-logger');
// Load front-end library routes and /front directory handler
require('./api/static');
server.start(function () { return logger.info('Started web server'); });
//# sourceMappingURL=index.js.map