import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { objChat } from "../utils/object_chat";
import { useHandleChats } from "../hooks/useHandleChats";
import "../styles/create.css";

export const Create = () => {
  const [formChat, setFormChat] = useState(objChat);
  const [msg, setMsg] = useState("");
  const { createChat } = useHandleChats();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormChat({ ...formChat, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();  
 
    if (formChat.title.length > 10) {
      setMsg("Título máximo 10 caracteres");
      return;
    }
    if (formChat.description.length >= 200) {
      setMsg("Descripción máximo 200 caracteres");
      return;
    }
    createChat(formChat);
    setFormChat(objChat);
    navigate("/chats");
  };

  return (
    <section className="sec-form-create">
      <form onSubmit={handleSubmit} className="form-create-chat">
        <h1>Nuevo chat</h1>
        {msg && <p className="title-message">{msg}</p>}
        <input
          type="text"
          placeholder="Nombre del chat"
          name="title"
          value={formChat.title}
          onChange={handleChange}
          required
          className="input-create"
        />
        <textarea
          placeholder="Descripcion de chat..."
          name="description"
          value={formChat.description}
          onChange={handleChange}
          className="input-create textarea"
          required
          rows={4}
        />
        <div className="container-input-create">
          <label htmlFor="global">¿Quieres que el chat sea global?</label>
          <input
            type="checkbox"
            name="global"
            id="global"
            value={formChat.global}
            onChange={(e) =>
              setFormChat({ ...formChat, global: e.target.checked })
            }
          />
        </div>

        <button type="submit" className="btn-create">
          Crear
        </button>
      </form>
    </section>
  );
};
