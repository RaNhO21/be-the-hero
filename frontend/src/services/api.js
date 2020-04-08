import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-bethehero-hilario.herokuapp.com/'
});

export default api;
