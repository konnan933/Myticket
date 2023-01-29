import Axios from 'axios';

const api = Axios.create({
  baseURL: 'localhost:8000/',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true
});

export default api;
