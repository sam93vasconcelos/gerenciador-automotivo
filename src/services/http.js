import axios from 'axios';
import toast from 'react-hot-toast';
import { getToken } from './auth';

import history from './history';

const http = axios.create({
	baseURL: 'http://localhost:8000/api/'
});

http.interceptors.request.use(
	(config) => {
		config.headers['Authorization'] = `Bearer ${getToken()}`;

		return config;
	},
	(error) => {
		if (error.response.status === 401) {
			toast.error('Você não está autenticado!');
			history.push('/login');
			// window.location.reload();
		} else {
			toast.error('Erro!');
		}
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
			// window.location.reload();
		} else {
			toast.error('Erro!');
		}
		return Promise.reject(error);
	}
);

export default http;
