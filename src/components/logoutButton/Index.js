import { logout } from "../../services/auth";

import "./styles.scss";

function LogoutButton() {
  return (
    <button onClick={logout} className="logout">
      Sair
    </button>
  );
}

export default LogoutButton;
