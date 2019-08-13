import axios from 'axios';
import {reaction} from 'mobx';

export default class HttpService {

    constructor(rootStore) {
        this.rootStore  = rootStore;
        this.authStore = rootStore.authStore;
        
        axios.defaults.baseURL = 'http://localhost:8000';
        axios.defaults.headers.common['Authorization'] = this.authStore.authToken;

        reaction(() => this.authStore.authToken, () =>{
            axios.defaults.headers.common['Authorization'] = this.authStore.authToken;
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

}