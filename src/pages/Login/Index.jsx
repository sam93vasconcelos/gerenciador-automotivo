import { MdAccountCircle } from 'react-icons/md'
import { GiPadlock } from 'react-icons/gi'
import { BiShow, BiHide } from 'react-icons/bi'
import { useState } from 'react'
import './styles.scss'

import http from '../../services/http'

function Login() {
  const [showing, setShowing] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleShowPassword(status) {
    setShowing(status)
  }

  async function handleLogin(e) {
    e.preventDefault()

    const { data } = await http.post(`/login`, {
      email,
      password
    })

    console.log(data)
  }

  return (
    <div className="login-container">

      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={ handleLogin }>

          <div className="form-group">
            <MdAccountCircle size={ 25 } />
            <input
              type="text"
              placeholder="email"
              onChange={ (e) => setEmail(e.target.value) }
              value={ email }
            />
          </div>

          <div className="form-group">
            <GiPadlock size={ 25 } />
            <input
              type={ showing ? 'text' : 'password' }
              placeholder="senha"
              onChange={ (e) => setPassword(e.target.value) }
              value={ password }
            />
            { showing ? (
              <BiShow onClick={ () => handleShowPassword(false) } className="cursor-pointer" size={ 25 } />
            ) : (
              <BiHide onClick={ () => handleShowPassword(true) } className="cursor-pointer" size={ 25 } />
            ) }

          </div>
          <button className="btn btn-green">Entrar</button>

        </form>
      </div>
    </div>
  )
}

export default Login
