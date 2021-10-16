import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import useLoading from '../../hooks/useLoading';
import http from '../../services/http';

import './styles.scss';

function RequestEmail(props) {
  const [email, setEmail] = useState('');
  const [sended, setSended] = useState(false);
  const { setLoading } = useLoading();

  async function handleResquestEmail(e) {
    e.preventDefault();

    setLoading(true);
    try {
      await http.post('auth/password/email', {
        email,
      });
      setSended(true);
    } catch (error) {
      toast.error('Erro ao processar');
    }
    setLoading(false);
  }

  return (
    <div className="reset-password-container">

      <div className="content">
        { !sended ? (
          <form onSubmit={ handleResquestEmail }>
            <h1>Redefinir Senha</h1>

            <label htmlFor="password">Digite seu e-mail</label>
            <input 
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn btn-green w-100">Enviar</button>
          </form>
        ) : (
          <div>
            <h1 className="text-green">Verique seu E-mail!</h1>
            <p className="text-green">Você Receberá um e-mail com o link para trocar de senha</p>

          </div>
        ) }
        <Link to="/login">Voltar para a tela de login</Link>
      </div>
    </div>
  );
}

export default RequestEmail;