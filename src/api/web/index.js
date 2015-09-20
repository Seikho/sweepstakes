var server = require('../../server');
var Boom = require('boom');
var sessions = require('../../store/sessions');
var groups = require('../../store/groups');
var sweepstakes = require('../../store/sweepstakes');
server.route({
    method: 'GET',
    path: '/groups',
    handler: function (request, reply) {
        var token = request.params['token'];
        if (!token)
            return reply(Boom.badRequest('No token provided'));
        sessions.getByToken(token)
            .then(function (us) { return groups.get(us.groups); })
            .then(reply);
    }
});
server.route({
    method: 'GET',
    path: '/sweepstakes',
    handler: function (request, reply) {
        var token = request.params['token'];
        if (!token)
            return reply(Boom.badRequest('No token provided'));
        sessions.getByToken(token)
            .then(function (us) { return sweepstakes.get(us.userId); })
            .then(reply);
    }
});
//# sourceMappingURL=index.js.map