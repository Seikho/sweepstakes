require.config({
    baseUrl: 'scripts/libs',
    shim: {
        'facebook': {
            exports: 'FB',
            paths: '//connect.facebook.net/en_US/sdk'
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'jquery': {
            exports: 'jQuery'
        }
    },
    paths: {
        'facebook': ['//connect.facebook.net/en_US/sdk']
    }
})

require(['facebook', 'knockout', 'bootstrap'], FB => {
    FB.init({
        appId: '1678111022409313',
        version: 'v2.4',
        xfbml: true
    });
    
    // Facebook API requires global function
    window['checkLoginState'] = checkLoginState;
    require(['../init'])
});

function checkLoginState(info: any) {
    console.log(info);
    FB.getLoginStatus(status => console.log(status));
}