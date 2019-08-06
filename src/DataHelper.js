import { decorate, observable } from 'mobx';

let instance;

class DataHelper {

    authToken = '';

    constructor() {
        if (instance) return instance;
        instance = this;
    }

    baseURL() {
        return 'http://localhost:8000';
    }

    setAuthToken(token) {
        this.authToken = token.token_type + ' ' + token.access_token;
        localStorage.setItem('auth_token', this.authToken);
    }

    getAuthToken() {
        if (this.authToken == null) {
            this.authToken = localStorage.getItem('auth_token');
        }
        return this.authToken;
    }

    static baseURL() {
        const dataHelper = new DataHelper();
        return dataHelper.baseURL();
    }

    static setAuthToken(token) {
        const dataHelper = new DataHelper();        
        dataHelper.setAuthToken(token);
    }

    static getAuthToken() {
        const dataHelper = new DataHelper();
        return dataHelper.getAuthToken();
    }

}

const helper = new DataHelper();

decorate(DataHelper, {
    authToken: observable
});


export default DataHelper;