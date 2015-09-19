interface NodeRequireFunction {
    (modules: string[], callback?: (...args) => any);
    config(options: any);
}

declare namespace FB {
    function getLoginStatus(callback: LoginCallback): void;
    function init(options: Options): void;
    function login(callback: LoginCallback): void;
    
    interface LoginCallback {
        (status: Status) => void;
    }
    
    interface Options {
        appId: string;
        version: string;
        xfbml?: boolean;
        [option: string]: any;
    }
    
    interface Status {
        status: string;
        authResponse: {
            accessToken: string;
            expiresIn: string;
            signedRequest: string;
            userID: string;
        }
    }
}

