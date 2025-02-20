import { useState } from "react";
import { useHandleUser } from "../contexts/ContextChat";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const {loginUser} = useHandleUser(); 
  const navigate = useNavigate();

  const handleSubmitUser = () => {
    loginUser(username);
    setUsername(""); 
    navigate("/")
  };

  return (
    <section className="section-login">
    <form onSubmit={handleSubmitUser} className="form-login">
      <input
        type="text"
        placeholder="agrega tu nombre de usuario"
        className="input-login"
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit" className="btn-login">Login</button>
    </form>
    </section>
  );
};
