import path = require('path');
import server = require('../../server');
var basePath = '../../../node_modules';
var bootstrap = path.resolve(basePath, 'bootstrap/dist/js/bootstrap.js');
var cajon = path.resolve(basePath, 'cajon/cajon.js');
var knockout = path.resolve(basePath, 'knockout/build/output/knockout-latest.js');

addRoute('bootstrap', bootstrap);
addRoute('cajon', cajon);
addRoute('knockout', knockout);

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: path.resolve(__dirname, '../../../front')
        }
    }
})

function addRoute(filename: string, path: string) {
    server.route({
        method: 'GET',
        path: `/scripts/libs/${filename}.js`,
        handler: (request, reply) => {
            reply.file(path);
        }
    });
}