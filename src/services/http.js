import axios from 'axios';
import toast from 'react-hot-toast';

import history from './history';

const http = axios.create({
  baseURL: 'http://localhost:3333/'
});



http.interceptors.response.use(response =>  {
  return response;
}, error => {
  if(error.response.status === 401) {
    toast.error('Você não está autenticado!')
    history.push('/login');
    // window.location.reload();
  } else {
    toast.error('Erro!')
  }
  return Promise.reject(error);
});

export default http;
