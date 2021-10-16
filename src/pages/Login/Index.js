import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { GiPadlock } from "react-icons/gi";
import { BiShow, BiHide } from "react-icons/bi";
import { toast } from "react-hot-toast";
import ReactLoading from "react-loading";
import "./styles.scss";

import http from "../../services/http";
import { getToken, setToken } from "../../services/auth";

import carImg from "../../assets/car.png";

import history from "../../services/history";

function Login() {
  useEffect(() => {
    if(getToken()) {
      history.push('/');
    }

    return () => {
      
    }
  }, []);

  const [showing, setShowing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  function handleShowPassword(status) {
    setShowing(status);
  }

  async function handleLogin(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const { data } = await http.post(`auth/login`, {
        email,
        password,
      });

      setToken(data.access_token);
      history.push("/");
    } catch (e) {
      if(e.response.status === 422) {
        toast.error("Usuário ou senha inválida!");
      } else {
        toast.error("Erro ao refazer login!");
      }
    }

    setLoading(false);
  }

  return (
    <div className="login-container">
      <div>
        <h1>Gerenciador Automotivo</h1>
        <img src={carImg} alt="Car Img" />
      </div>

      <div className="form-container">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <MdAccountCircle size={30} />
            <input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="form-group">
            <GiPadlock size={30} />
            <input
              type={showing ? "text" : "password"}
              placeholder="senha"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {showing ? (
              <BiShow
                onClick={() => handleShowPassword(false)}
                className="cursor-pointer"
                size={30}
              />
            ) : (
              <BiHide
                onClick={() => handleShowPassword(true)}
                className="cursor-pointer"
                size={30}
              />
            )}
          </div>

          <hr />

          {loading ? (
            <ReactLoading type={"bubbles"} />
          ) : (
            <button className="btn btn-green">Entrar</button>
          )}

          <p>
            Esqueceu a senha? Clique <Link to="/email">aqui</Link>.
          </p>

          <p>
            Não tem uma conta? Clique <Link to="/sign-up">aqui</Link> para
            criar!
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
