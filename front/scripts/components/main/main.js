var ko = require('knockout');
var FB = require('facebook');
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
        };
        this.checkCurrentUser();
    }
    return MainViewModel;
})();
module.exports = MainViewModel;
//# sourceMappingURL=main.js.map