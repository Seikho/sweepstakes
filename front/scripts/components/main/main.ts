import ko = require('knockout');
import FB = require('facebook');
import $ = require('jquery');
export = MainViewModel;

class MainViewModel {
    constructor() {
        this.checkCurrentUser();
    }

    currentUser = ko.observable('');
    loginButtonText = ko.computed(() => {
        var user = this.currentUser() || '';
        return user.length > 0 ? user : 'Login';
    });

    loginButton = () => {
        if (this.loginButtonText() !== 'Login') return;
        FB.login(this.setCurrentUser);
    }

    checkCurrentUser = () => {
        FB.getLoginStatus(this.setCurrentUser);
    }

    setCurrentUser = (status: FB.Status) => {
        if (status.status !== 'connected') return;
        FB.api('/me', info => {
            if (!info.name) return;
            this.currentUser(info.name);
        });
        this.login(status);
    }

    groups = ko.observableArray<Sweepstakes.Group>([]);
    sweepstakes = ko.observableArray<Sweepstakes.Sweepstake>([]);

    createGroup = () => { }
    createSweepstake = () => { }
    findUsers = (search: string) => { }
    addEntry = () => { }

    login = (status: FB.Status) => {
        $.post('/login', status)
            .then(() => {
                this.getGroups(FB.getAccessToken());
                this.getSweepstakes(FB.getAccessToken());
            })
            .fail(err => console.log(err));
    }

    getGroups = (token: string) => {
        $.get('/groups', { token })
            .then(this.groups);
    }

    getSweepstakes = (token: string) => {
        $.get('/sweepstakes', { token })
            .then(this.sweepstakes);
    }
}