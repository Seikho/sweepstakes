var ko = require('knockout');
var UserModel = (function () {
    function UserModel(user) {
        this.name = ko.observable("");
        this.email = ko.observable("");
        this.groups = ko.observableArray([]);
        this.sweepstakes = ko.observableArray([]);
    }
    return UserModel;
})();
//# sourceMappingURL=index.js.map