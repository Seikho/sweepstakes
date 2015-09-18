import Hapi = require('hapi');
var logger = require('ls-logger');
var inert = require('inert');
export = server;

var server = new Hapi.Server();
server.register(inert, err => {
    logger.error('Unable to load "inert" middleware');
});

server.connection({
    port: 1923
});