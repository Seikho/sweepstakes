var Hapi = require('hapi');
var logger = require('ls-logger');
var inert = require('inert');
var server = new Hapi.Server();
server.register(inert, function (err) {
    if (!err)
        return;
    logger.error("Unable to load \"inert\" middleware: " + err);
});
var port = 1923;
logger.info("Web server configured ot listen on port " + port);
server.connection({
    port: port
});
module.exports = server;
//# sourceMappingURL=server.js.map