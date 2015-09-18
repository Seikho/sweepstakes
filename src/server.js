var Hapi = require('hapi');
var logger = require('ls-logger');
var inert = require('inert');
var server = new Hapi.Server();
server.register(inert, function (err) {
    logger.error('Unable to load "inert" middleware');
});
server.connection({
    port: 1923
});
module.exports = server;
//# sourceMappingURL=server.js.map