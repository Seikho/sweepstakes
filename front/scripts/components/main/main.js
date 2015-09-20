var ko = require('knockout');
var FB = require('facebook');
var $ = require('jquery');
var MainViewModel = (function () {
    function MainViewModel() {
        var _this = this;
        this.currentUser = ko.observable('');
        this.loginButtonText = ko.computed(function () {
            var user = _this.currentUser() || '';
            return user.length > 0 ? user : 'Login';
        });
        this.loginButton = function () {
            if (_this.loginButtonText() !== 'Login')
                return;
            FB.login(_this.setCurrentUser);
        };
        this.checkCurrentUser = function () {
            FB.getLoginStatus(_this.setCurrentUser);
        };
        this.setCurrentUser = function (status) {
            if (status.status !== 'connected')
                return;
            FB.api('/me', function (info) {
                if (!info.name)
                    return;
                _this.currentUser(info.name);
            });
            _this.login(status);
        };
        this.groups = ko.observableArray([]);
        this.sweepstakes = ko.observableArray([]);
        this.createGroup = function () { };
        this.createSweepstake = function () { };
        this.findUsers = function (search) { };
        this.addEntry = function () { };
        this.login = function (status) {
            $.post('/login', status)
                .then(function () {
                _this.getGroups(FB.getAccessToken());
                _this.getSweepstakes(FB.getAccessToken());
            })
                .fail(function (err) { return console.log(err); });
        };
        this.getGroups = function (token) {
            $.get('/groups', { token: token })
                .then(_this.groups);
        };
        this.getSweepstakes = function (token) {
            $.get('/sweepstakes', { token: token })
                .then(_this.sweepstakes);
        };
        this.checkCurrentUser();
    }
    return MainViewModel;
})();
module.exports = MainViewModel;
//# sourceMappingURL=main.js.map