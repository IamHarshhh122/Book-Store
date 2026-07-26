import axios from 'axios';

const API = axios.create({
  baseURL: 'https://bobook-store-backend.onrender.com',
});

export default API;
