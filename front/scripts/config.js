require.config({
    baseUrl: '/scripts/libs',
    shim: {
        'facebook': {
            exports: 'FB'
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'jquery': {
            exports: 'jQuery'
        }
    },
    paths: {
        'facebook': '//connect.facebook.net/en_US/sdk'
    }
});
require(['facebook', 'knockout', 'bootstrap'], function (FB) {
    FB.init({
        appId: 'sweepstakes',
        version: 'v0.1'
    });
});
//# sourceMappingURL=config.js.map