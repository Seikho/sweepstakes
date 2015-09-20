var server = require('../../server');
var Boom = require('boom');
var sessions = require('../../store/sessions');
var groups = require('../../store/groups');
var sweepstakes = require('../../store/sweepstakes');
server.route({
    method: 'GET',
    path: '/groups',
    handler: function (request, reply) {
        var token = request.query.token;
        if (!token)
            return reply(Boom.badRequest('No token provided'));
        sessions.getByToken(token)
            .then(function (us) { return groups.get(us.groups); })
            .then(reply)
            .catch(function (err) { return reply(Boom.expectationFailed(err)); });
    }
});
server.route({
    method: 'GET',
    path: '/sweepstakes',
    handler: function (request, reply) {
        var token = request.query.token;
        if (!token)
            return reply(Boom.badRequest('No token provided'));
        sessions.getByToken(token)
            .then(function (us) { return sweepstakes.get(us.userId); })
            .then(reply)
            .catch(function (err) { return reply(Boom.expectationFailed(err)); });
    }
});
server.route({
    method: 'POST',
    path: '/login',
    handler: function (request, reply) {
        var token = request.payload;
        sessions.create(token)
            .then(reply)
            .catch(function (err) { return reply(Boom.expectationFailed(err)); });
    }
});
//# sourceMappingURL=index.js.map