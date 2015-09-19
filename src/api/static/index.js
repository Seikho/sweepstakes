var path = require('path');
var server = require('../../server');
var basePath = path.resolve(__dirname, '../../../node_modules');
var bootstrap = path.resolve(basePath, 'bootstrap/dist/js/bootstrap.js');
var cajon = path.resolve(basePath, 'cajon/cajon.js');
var knockout = path.resolve(basePath, 'knockout/build/output/knockout-latest.js');
var jquery = path.resolve(basePath, 'jquery/dist/jquery.min.js');
addRoute('bootstrap', bootstrap);
addRoute('cajon', cajon);
addRoute('knockout', knockout);
addRoute('jquery', jquery);
server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: path.resolve(__dirname, '../../../front')
        }
    }
});
server.route({
    method: 'GET',
    path: '/fonts/{param*}',
    handler: {
        directory: {
            path: path.resolve(__dirname, '../../../node_modules/bootstrap/fonts')
        }
    }
});
function addRoute(filename, path) {
    server.route({
        method: 'GET',
        path: "/scripts/libs/" + filename + ".js",
        handler: function (request, reply) {
            reply.file(path);
        }
    });
}
//# sourceMappingURL=index.js.map