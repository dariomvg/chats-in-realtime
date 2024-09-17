import { useState } from "react";
import "../styles/create.css";
import { useNavigate } from "react-router-dom";
import { objChat } from "../utils/objectChat";
import { useHandleChat } from "../contexts/ContextChat";

export const Create = () => {
  const [formChat, setFormChat] = useState(objChat);
  const [msg, setMsg] = useState("");
  const { createChat } = useHandleChat();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormChat({
      ...formChat,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formChat.password.length > 6 || formChat.password.length < 4) {
      setMsg("La contraseña debe ser de 4 a 6 caracteres");
      console.log("here 1")
      return; 
    }
    if(formChat.title.length > 10) {
      setMsg("El título no debe superar los 10 caracteres");
      console.log("here 2")
      return;
    }
    createChat(formChat);
    setFormChat(objChat);
    navigate("/");
  };

  return (
    <section className="sec-form-create">
      <form onSubmit={handleSubmit} className="form-create-chat">
        <h1>Crear chat</h1>
        {msg && <p className="title-message">{msg}</p>}
        <input
          type="text"
          placeholder="nombre del chat"
          name="title"
          value={formChat.title}
          onChange={handleChange}
          required
          className="input-create"
        />
        <input
          type="text"
          placeholder="Crea contraseña para el chat"
          name="password"
          value={formChat.password}
          onChange={handleChange}
          className="input-create"
          required
        />
        <button type="submit" className="btn-create">Crear</button>
      </form>
    </section>
  );
};