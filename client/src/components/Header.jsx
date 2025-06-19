import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";
import { useHandleUser } from "../contexts/ContextChat";

export const Header = () => {
  const { logOut, username } = useHandleUser();
  const navigate = useNavigate(); 
  const logoutUser = async () => {
    const result = await logOut();
    if(result.ok) navigate("/");
  }

  return (
    <header className="header">
      <nav className="nav">
        <Link className="link" to="/chats">
          Tus Chats
        </Link>
        <Link className="link" to="/nuevo/chat">
          Nuevo chat
        </Link>
        <Link className="link" to="/global/chats">
          Chats globales
        </Link>
        <Link className="link" to="/configuracion">
          Configuración
        </Link>
        {!username ? (
          <Link className="link login" to="/registro/usuario">
            Iniciar sesión
          </Link>
        ) : (
          <button className="btn-header-logout" onClick={logoutUser}>
            Cerrar sesión
          </button>
        )}
      </nav>
    </header>
  );
};
