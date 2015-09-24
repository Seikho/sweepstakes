import Hapi = require('hapi');
var logger = require('ls-logger');
var inert = require('inert');
export = server;

var server = new Hapi.Server();
server.register(inert, err => {
    if (!err) return;
    
    logger.error(`Unable to load "inert" middleware: ${err}`);
});
var port = 1923;
logger.info(`Web server configured to listen on port ${port}`)

server.connection({
    port
});