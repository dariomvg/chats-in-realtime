import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";
import { useHandleChat } from "../contexts/ContextChat";
import { logout } from "../helpers/logOut";


export const Header = () => {
  const { user } = useHandleChat();
  const navigate = useNavigate(); 

  const logoutUser = () => {
    logout();
    location.reload(); 
    navigate("/")
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
            Login
          </Link>
        ) : (
          <button className="btn-header-logout" onClick={logoutUser}>
            Log out
          </button>
        )}
      </nav>
    </header>
  );
};
