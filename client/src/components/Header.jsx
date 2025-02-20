import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";
import { useHandleUser } from "../contexts/ContextChat";

export const Header = () => {
  const { user, logoutUser } = useHandleUser();
  const navigate = useNavigate();

  const logout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <header className="header">
      <nav className="nav">
        <Link className="link" to="/">
          Principal
        </Link>
        <Link className="link" to="/chats">
          Chats
        </Link>
        <Link className="link" to="/crear">
          Crear
        </Link>
        {!user ? (
          <Link className="link" to="/login">
            Crear usuario
          </Link>
        ) : (
          <button className="btn-header-logout" onClick={logout}>
            Cerrar sesión {user}
          </button>
        )}
      </nav>
    </header>
  );
};
