import axios from 'axios';
import {reaction} from 'mobx';

export default class HttpService {

    constructor(rootStore) {
        this.rootStore  = rootStore;
        this.authStore = rootStore.authStore;

        this.clientID = 'HCr4jR68hZfm4ifkYWKb0xC3WGtdae3ZgKZHMxFj';
        
        // refresh 되기를 기다리는 요청 목록을 리스트로 만듦
        this.refreshSubscribers = [];
        this.isRefreshingToken = false;
        
        axios.defaults.baseURL = 'http://api.pointmall.eunji.co.kr';
        axios.defaults.headers.common['Authorization'] = this.authStore.authToken;

        reaction(() => this.authStore.authToken, () =>{
            axios.defaults.headers.common['Authorization'] = this.authStore.authToken;
        });

        // 밑의 메소드들로 이동하기 전에 먼저 데이터를 가공해주고 보내기 위해 interceptor를 사용
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
                    if (!this.isRefreshingToken) {
                        // 예를 들어 토큰이 만료되었을 때, getMe 등이 여러번 실행될 수 있다.
                        // 여러번 실행되는 것을 막고자 inRefreshingToken을 true로 바꿔주어 한 번만 실행되도록 함
                        this.isRefreshingToken = true;
                        return new Promise((resolve, reject) => {
                            this.refreshToken().then(token => {
                                originalRequest.headers.Authorization = this.authStore.authToken;
                                
                                // 아래 주석 처리된 코드가 48라인과 같은 의미
                                // axios(originalRequest).then(response => {
                                //     resolve(response);
                                // }).catch(error => {
                                //     reject(error);
                                // });
                                resolve(axios(originalRequest));
                                
                                for (let subscriber of this.refreshSubscribers) {
                                    subscriber(token);
                                }
                            }).catch(error => {
                                this.authStore.deleteToken();
                                reject(originalError);
                                alert('로그인이 필요한 서비스입니다.');
                                this.rootStore.history.push('/login');
                                for (let subscriber of this.refreshSubscribers) {
                                    subscriber(null);
                                }
                            }).finally(() => {
                                this.refreshSubscribers = [];
                                this.isRefreshingToken = false;
                            });
                        });
                    }
                    
                    return new Promise((resolve, reject) => {
                        this.refreshSubscribers.push(token => {
                            if (token == null) {
                                reject(originalError);
                            } else {    
                                originalRequest.headers.Authorization = this.authStore.authToken;
                                resolve(axios(originalRequest));
                            }
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

    indexTagItems(tag) {
        return axios.get('/tags/' + tag + '/items/')
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

    indexHistory() {
        return axios.get('/histories/')
            .then(response => {
                return response.data;
            });
    }

    refundHistory(historyId) {
        return axios.post('/histories/' + historyId + '/refund/')
            .then(response => {
                return response.data;
            });
    }

}