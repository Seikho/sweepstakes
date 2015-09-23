import ko = require('knockout');
class UserModel {
	constructor(user?: Sweepstakes.User){}
	
	name = ko.observable("");
	email = ko.observable("");
	groups = ko.observableArray([]);
	sweepstakes = ko.observableArray([]);
}