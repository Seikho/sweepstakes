interface NodeRequireFunction {
    (modules: string[], callback?: (...args) => any);
    config(options: any);
}

declare module 'facebook' {
    export = FB;
}

declare namespace FB {
    function getLoginStatus(callback: LoginCallback): void;
    function init(options: Options): void;
    function login(callback: LoginCallback): void;
    function api(route: string, callback: ApiCallback): void;
    
    interface ApiCallback {
        (response: any): void;
    }
    
    interface LoginCallback {
        (status: Status): void;
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
    
    interface TokenStatus {
        data: {
            app_id: string;
            application: string;
            expires_at: number;
            is_valid: boolean;
            scopes: Array<string>;
            user_id: string;
            error?: {
                code: number;
                message: string;
                subcode: number;
            }
        }
    }
    
    interface User {
        name: string;
        id: string;
    }
}

declare namespace Sweepstakes {
    interface Settings {
        secret: string;
        client_id; string;
    }
    
    interface User {
        id: number;
        name: string;
        groups: string;
        entries: string;
        facebookId: string;        
    }
    
    interface Group {
        id: number;
        name: string;
        description: string;
        owners: string;
    }
    
    interface Sweepstakes {
        id: number;
        name: string;
        description: string;
        startDate: string;
        endDate: string;
        options?: string;
        groupId: number;
    }
    
    interface Session {
        id: number;
        userId: number;
        token: string;
    }
    
    interface UserSession extends User, Session {
        
    }
}