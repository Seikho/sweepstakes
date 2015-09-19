import ko = require('knockout');
import FB = require('facebook');
export = MainViewModel;

class MainViewModel {
    constructor(){
        this.checkCurrentUser();
    }
    
    currentUser = ko.observable('');
    loginButtonText = ko.computed(() => {
        var user = this.currentUser() || '';
        
        return user.length > 0 ? user : 'Login';
    });
    
    loginButton() {
        if (this.loginButtonText() === 'Login') return;
        FB.login(this.setCurrentUser);
    }
    
    checkCurrentUser() {
        FB.getLoginStatus(this.setCurrentUser);
    }
    
    setCurrentUser(status: FB.Status) {
        if (status.status !== 'connected') return;
        FB.api('/me', info => console.log(info));
    }
}