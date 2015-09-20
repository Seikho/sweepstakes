import request = require('request');
import accessToken = require('./accessToken');

export = function getUser(userId: number | string): Promise<FB.User> {
    var resolve, reject;
    var promise = new Promise<FB.User>((res, rej) => {
        resolve = res;
        reject = rej;
    });

    accessToken()
        .then(token => {
            var url = `https://graph.facebook.com/v2.4/${userId}?access_token=${token}`;
            request.get(url, {}, (err, res, body) => {
                if (err) return reject(err);
                if (!!body.user || !!body.id) return reject('Unable to retrieve user');
                
                resolve(body);
            })
        })
        
    return promise;
}