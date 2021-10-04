import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdAccountCircle } from 'react-icons/md';
import { GiPadlock } from 'react-icons/gi';
import { BiShow, BiHide } from 'react-icons/bi';
import { HiOutlineMail } from 'react-icons/hi';
import './styles.scss';

import { signUp } from '../../services/auth';

import carImg from '../../assets/car.png';

function SignUp() {
	const [ showing, setShowing ] = useState(false);
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	function handleShowPassword(status) {
		setShowing(status);
	}

	async function handleSignUp(e) {
		e.preventDefault();

		await signUp(name, email, password);
	}

	return (
		<div className="login-container">
			<div>
				<h1>Gerenciador Automotivo</h1>
				<img src={carImg} alt="Car Img" />
			</div>

			<div className="form-container">
				<h2>Criar conta</h2>

				<form onSubmit={handleSignUp}>
					<div className="form-group">
						<MdAccountCircle size={25} />
						<input type="text" placeholder="Seu nome" onChange={(e) => setName(e.target.value)} value={name} />
					</div>

					<div className="form-group">
						<HiOutlineMail size={25} />
						<input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email} />
					</div>

					<div className="form-group">
						<GiPadlock size={25} />
						<input
							type={showing ? 'text' : 'password'}
							placeholder="senha"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
						{showing ? (
							<BiShow onClick={() => handleShowPassword(false)} className="cursor-pointer" size={25} />
						) : (
							<BiHide onClick={() => handleShowPassword(true)} className="cursor-pointer" size={25} />
						)}
					</div>
					<button className="btn btn-green">Criar</button>

					<p>
						Já tem uma conta? Clique <Link to="/login">aqui</Link> para entrar!
					</p>
				</form>
			</div>
		</div>
	);
}

export default SignUp;
