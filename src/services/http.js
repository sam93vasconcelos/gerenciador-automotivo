import axios from 'axios';
import toast from 'react-hot-toast';
import { getToken } from './auth';

import history from './history';

const http = axios.create({
	baseURL: 'http://192.168.7.114:8000/api/'
});

http.interceptors.request.use(
	(config) => {
		config.headers['Authorization'] = `Bearer ${getToken()}`;

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

http.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		console.log(error);
		if (error.response.status === 401) {
			toast.error('Você não está autenticado!');
			history.push('/login');
		} else if(error.response.status === 403) {
			toast.error('Não autorizado');
			history.push('/');
		}
		return Promise.reject(error);
	}
);

export default http;
