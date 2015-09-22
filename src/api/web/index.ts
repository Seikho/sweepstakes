import server = require('../../server');
import Boom = require('boom');
import users = require('../../store/users');
import sessions = require('../../store/sessions');
import groups = require('../../store/groups');
import sweepstakes = require('../../store/sweepstakes');

server.route({
    method: 'GET',
    path: '/groups',
    handler: (request, reply) => {
        var token = request.query.token;

        if (!token) return reply(Boom.badRequest('No token provided'));

        sessions.getByToken(token)
            .then(us => groups.get(us.groups))
            .then(reply)
            .catch(err => reply(Boom.expectationFailed(err)))
    }
});

server.route({
    method: 'GET',
    path: '/sweepstakes',
    handler: (request, reply) => {
        var token = request.query.token;
        if (!token) return reply(Boom.badRequest('No token provided'));

        sessions.getByToken(token)
            .then(us => sweepstakes.get(us.userId))
            .then(reply)
            .catch(err => reply(Boom.expectationFailed(err)))
    }
});

server.route({
    method: 'POST',
    path: '/login',
    handler: (request, reply) => {
        var token: FB.Status = request.payload;

        sessions.create(token)
            .then(reply)
            .catch(err => reply(Boom.expectationFailed(err)));
    }
});

server.route({
    method: 'POST',
    path: '/groups',
    handler: (request, reply) => {
        var group: Sweepstakes.Group = request.payload.group;
        var token = request.payload.token;

        sessions.getByToken(token)
            .then(us => groups.create(token.userId, group.name, group.description))
            .then(reply)
            .catch(err => reply(Boom.expectationFailed(err)));
    }
});

server.route({
    method: 'POST',
    path: '/sweepstakes',
    handler: (request, reply) => {
        var newStakes: Sweepstakes.Sweepstake = request.payload.sweepstakes;
        var token: FB.Status = request.payload.token;
        
        sessions.getByToken(token)
            .then(us => sweepstakes.create(newStakes.name, newStakes.description, newStakes.groupId))
            .then(reply)
            .catch(err => reply(Boom.expectationFailed(err)));     
    }
});