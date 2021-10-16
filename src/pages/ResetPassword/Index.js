import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useLoading from '../../hooks/useLoading';
import history from '../../services/history';
import http from '../../services/http';

import './styles.scss';

function ResetPassword(props) {
  const { email, token } = props.match.params;
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');
  const { setLoading } = useLoading();

  async function changePassword(e) {
    e.preventDefault();

    setLoading(true);
    try {
      await http.post('auth/password/reset', {
        email,
        token,
        password,
        password_confirmation
      });
      toast.success('Senha redefinida!');
      history.push('/login');
    } catch (error) {
      toast.error('Erro ao redenifir');
    }
    setLoading(false);
  }

  return (
    <div className="reset-password-container">

      <div className="content">
        <h1>Redefinir Senha</h1>

        <form onSubmit={ changePassword }>
          <label htmlFor="password">Nova Senha</label>
          <input 
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password_confirmation">Repetir Senha</label>
          <input 
            type="password" 
            id="password_confirmation"
            value={password_confirmation}
            onChange={(e) => setPassword_confirmation(e.target.value)}
          />
          <button className="btn btn-green w-100">Confirmar</button>
        </form>

      </div>
    </div>
  );
}

export default ResetPassword;