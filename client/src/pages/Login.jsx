import { useState } from "react";
import { useHandleUser } from "../contexts/ContextChat";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
const obj_user = { username: "", pass: "" };

export const Login = () => {
  const [user, setUser] = useState(obj_user);
  const [register, setRegister] = useState(false);
  const { login, signUp, msgUserSign, messageSign, messageLogin } =
    useHandleUser();
    const navigate = useNavigate(); 

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    if (!register) {
      signUp(user);
    } else {
      const data = await login(user);
      if(data.username) navigate("/");
    }
    setUser(obj_user);
  };

  return (
    <section className="section-login">
      <form onSubmit={handleSubmitUser} className="form-login">
        <h3>{register ? "Iniciar sesión" : "Registrarse"}</h3>
        {msgUserSign && <p className="message-auth success">{msgUserSign}</p>}
        {messageSign && <p className="message-auth">{messageSign}</p>}
        {messageLogin && <p className="message-auth">{messageLogin}</p>}
        <input
          type="text"
          placeholder="Nombre de usuario"
          className="input-login"
          required
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          type="password"
          className="input-login"
          required
          value={user.pass}

          onChange={(e) => setUser({ ...user, pass: e.target.value })}
          placeholder="Contraseña"
        />
        <button type="submit" className="btn-login">
          {register ? "Iniciar sesión" : "Registrarse"}
        </button>
        <button
          type="button"
          className="button-change-register"
          onClick={() => setRegister(!register)}>
          {register ? "¿No tienes una cuenta?" : "¿Ya tienes un cuenta?"}
        </button>
      </form>
    </section>
  );
};
