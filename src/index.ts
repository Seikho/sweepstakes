import server = require('./server');
import initDb = require('./store/init');
import FBApi = require('facebook-ts');
import settings = require('./store/settings');
var logger = require('ls-logger');

// Initialise the database
var createdDb = initDb();
if (createdDb) logger.info('Created database');

// Load front-end library routes and /front directory handler
require('./api/static');

// Load web api routes
require('./api/web');

// Configure FacebookTS
settings.get()
    .then(config => {
        if (!config.secret) return logger.error('Failed to configure FacebookTS: Secret not set');
        if (!config.clientId) return logger.error('Failed to configure FacebookTS: ClientId not set');
        
        FBApi.settings.setSecret(config.secret);
        FBApi.settings.setClientId(config.clientId);
        logger.info('FacebookTS: Successfully configured');
    });
    

server.start(() => logger.info('Started web server'));