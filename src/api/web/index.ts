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
        var token = request.params['token'];
        if (!token) return reply(Boom.badRequest('No token provided'));
        
        sessions.getByToken(token)
            .then(us => groups.get(us.groups))
            .then(reply)
    }
    
})

server.route({
    method: 'GET',
    path: '/sweepstakes',
    handler: (request, reply) => {
        var token = request.params['token'];
        if (!token) return reply(Boom.badRequest('No token provided'));
        
        sessions.getByToken(token)
            .then(us => sweepstakes.get(us.userId))
            .then(reply)
    }
    
})