import http from './http';
import toast from 'react-hot-toast';
import history from './history';

async function signUp(name, email, password) {
	try {
		await http.post(`/auth/signup`, {
			name,
			email,
			password,
			password_confirmation: password
		});

		history.push('/login');
		toast.success('Usuário criado!');
	} catch (e) {
		console.log(e);
		toast.error('Erro ao criar conta');
	}
}

function getToken() {
	let token = localStorage.getItem('token');
	return token ? token : '';
}

function setToken(token) {
	localStorage.setItem('token', token);
}

function logout() {
	localStorage.removeItem('token');
	localStorage.removeItem('user');
	history.push('/login');
}

export { signUp, getToken, setToken, logout };
