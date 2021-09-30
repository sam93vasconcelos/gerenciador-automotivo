import { useState } from "react";
import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { GiPadlock } from "react-icons/gi";
import { BiShow, BiHide } from "react-icons/bi";
import { toast } from "react-hot-toast";
import "./styles.scss";

import http from "../../services/http";
import { setToken } from "../../services/auth";

import carImg from "../../assets/car.png";

import history from "../../services/history";

function Login() {
  const [showing, setShowing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleShowPassword(status) {
    setShowing(status);
  }

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const { data } = await http.post(`/login`, {
        email,
        password,
      });

      setToken(data.token);
      history.push("/");
    } catch (e) {
      console.log(e);
      toast.error("Erro!");
    }
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
            <MdAccountCircle size={25} />
            <input
              type="text"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="form-group">
            <GiPadlock size={25} />
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
                size={25}
              />
            ) : (
              <BiHide
                onClick={() => handleShowPassword(true)}
                className="cursor-pointer"
                size={25}
              />
            )}
          </div>
          <button className="btn btn-green">Entrar</button>

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
