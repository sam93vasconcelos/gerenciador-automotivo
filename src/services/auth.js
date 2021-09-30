import http from "./http";
import toast from "react-hot-toast";
import history from "./history";

async function signUp(name, email, password) {
  try {
    console.log({ name, email, password });
    let token = await http.post(`/signup`, { name, email, password });
    history.push("/");
  } catch (e) {
    console.log(e);
    toast.error("Erro ao criar conta");
  }
}

function getToken() {
  let token = localStorage.getItem("token");
  return token ?? "";
}

function setToken(token) {
  localStorage.setItem("token", token);
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  history.push("/login");
}

export { signUp, getToken, setToken, logout };
