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
        this.checkCurrentUser();
    }
    MainViewModel.prototype.loginButton = function () {
        if (this.loginButtonText() === 'Login')
            return;
        FB.login(this.setCurrentUser);
    };
    MainViewModel.prototype.checkCurrentUser = function () {
        FB.getLoginStatus(this.setCurrentUser);
    };
    MainViewModel.prototype.setCurrentUser = function (status) {
        if (status.status !== 'connected')
            return;
        FB.api('/me', function (info) { return console.log(info); });
    };
    return MainViewModel;
})();
module.exports = MainViewModel;
//# sourceMappingURL=main.js.map