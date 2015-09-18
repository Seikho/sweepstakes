import Hapi = require("hapi");
export = server;

var server = new Hapi.Server();
server.connection({
    port: 1923
});