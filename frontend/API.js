import axios from 'axios';

const API = axios.create({
    baseURL: 'https://book-store-9cxi.onrender.com',
});

export default API;