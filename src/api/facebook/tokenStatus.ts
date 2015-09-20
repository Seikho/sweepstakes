import request = require('request');
import users = require('../../store/users');
import accessToken = require('./accessToken');
 
function get(userStatus: FB.Status) {
    accessToken()
        .then(token => debugToken(userStatus.authResponse.accessToken, token))
}

function debugToken(userToken: string, appToken: string): Promise<FB.TokenStatus> {
    var url = `https://graph.facebook.com/debug_token?input_token=${userToken}&access_token=${appToken}`;
    
    var promise = new Promise<FB.TokenStatus>((resolve, reject) => {
        request.post(url, {}, (err, res, body: FB.TokenStatus) => {
            if (err) return reject(err);
            if (body.data.error) return reject(body.data.error);
            
            resolve(body);
        })
    });
    
    return promise;
}