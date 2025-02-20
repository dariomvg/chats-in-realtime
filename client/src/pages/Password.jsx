import { useState } from "react";
import { useChat } from "../hooks/useChat";
import "../styles/password.css";
import { useNavigate, useParams } from "react-router-dom";

export const Password = () => {
  const [password, setPassword] = useState("");
  const { chatId } = useParams();
  const { sendPassword, error, detailsChat } = useChat(chatId);
  const navigate = useNavigate();

  const submitPassword = async (e) => {
    e.preventDefault();
    const verify = await sendPassword(password);
    if (verify) {
      navigate(`/chat/${chatId}?name=${detailsChat.title}&creator=${detailsChat.creator}`);
    }
    setPassword("");
  };

  return (
    <section className="section-password">
      <form onSubmit={submitPassword} className="form-pass">
        {error && <strong className="error">{error}</strong>}
        <input
          type="text"
          placeholder="Ingresa la contraseña del chat"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-pass"
        />
        <button type="submit" className="btn-pass">
          Ingresar
        </button>
      </form>
    </section>
  );
};
