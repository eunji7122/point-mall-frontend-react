import axios from 'axios';
import {reaction} from 'mobx';

export default class HttpService {

    constructor(rootStore) {
        this.rootStore  = rootStore;
        this.authStore = rootStore.authStore;

        this.clientID = 'gAIXnRE0R85jHigVlKgolkWOxdA67CbcaGQaK0c7';
        
        axios.defaults.baseURL = 'http://localhost:8000';
        axios.defaults.headers.common['Authorization'] = this.authStore.authToken;

        reaction(() => this.authStore.authToken, () =>{
            axios.defaults.headers.common['Authorization'] = this.authStore.authToken;
        });

        axios.interceptors.response.use(response => {
            return response;
        }, originalError => {
            const { config, response } = originalError;
            const originalRequest = config;
            if (response.status === 401) {
                if (this.authStore.refreshToken == null) {
                    alert('로그인이 필요한 서비스입니다.');
                    this.rootStore.history.push('/login');
                } else {
                    return new Promise((resolve, reject) => {
                        this.refreshToken().then(token => {
                            originalRequest.headers.Authorization = this.authStore.authToken;
                            resolve(axios(originalRequest));
                        }).catch(error => {
                            this.authStore.deleteToken();
                            reject(originalError);
                            alert('로그인이 필요한 서비스입니다.');
                            this.rootStore.history.push('/login');
                        });
                    });
                }
            }
            else if (response.status === 402) {
                alert('잔액이 부족합니다. 포인트를 충전해 주세요.');
            }
            return Promise.reject(originalError);
        });

    }

    getMe() {
        return axios.get('/me/').then(response => {
            return response.data;
        });
    }
    
    indexItems() {
        return axios.get('/items/').then(response => {
                return response.data;
            });
    }

    getItems(itemId) {
        return axios.get('/items/' + itemId + '/')
            .then(response => {
                return response.data;
            });
    }

    indexMyItems() {
        return axios.get('/me/items/').then(response => {
            return response.data;
        });
    }

    purchaseItem(itemId) {
        return axios.post('/items/' + itemId + '/purchase/')
            .then(response => {
                return response.data;
            });
    }

    purchaseItems(items) {
        return axios.post('/items/purchase/', {items})
            .then(response => {
                return response.data;
            });
    }

    indexCategories() {
        return axios.get('/categories/')
            .then(response => {
                return response.data;
            });
    }

    indexCategoryItems(categoryId) {
        return axios.get('/categories/' + categoryId + '/items/')
            .then(response => {
                return response.data;
            });
    }

    register(username, password) {
        return axios.post('/users/', {
                username,
                password
            }).then(response => {
                return response.data;
            });
    }

    login(username, password) {
        return axios.post('/o/token/', {
            grant_type: "password",
            client_id: "gAIXnRE0R85jHigVlKgolkWOxdA67CbcaGQaK0c7",
            username,
            password
        }).then(response => {
            const token = response.data;
            this.authStore.setToken(token);
            return token;
        });
    }

    refreshToken() {
        return axios.post('/o/token/', {
            grant_type: 'refresh_token',
            client_id: this.clientID,
            refresh_token: this.authStore.refreshToken
        }).then(response => {
            const token = response.data;
            this.authStore.setToken(token);
            return token;
        });
    }


}