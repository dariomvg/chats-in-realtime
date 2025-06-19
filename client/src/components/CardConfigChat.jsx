import "../styles/card-config-chat.css";
import iconDelete from "../assets/trask.svg";
import { useState } from "react";

export const CardConfigChat = ({ chat, deleteChat, changeGlobal }) => {
  const [viewPass, setViewPass] = useState(false);

  return (
    <div className="card-config">
      <div className="content-card-config">
        <h3 className="title-card-config">{chat.title}</h3>
        <div className="container-card-config">
          <p className="title-global-config">{chat.global ? "Global" : "Privado"}</p>
          <button
            className="button-change-config"
            onClick={() => changeGlobal(!chat.global, chat.id)}>
            Cambiar a {chat.global ? "privado" : "global"}
          </button>
        </div>
        <div className="container-card-config">
          <button
            className="button-view-config"
            onClick={() => setViewPass(!viewPass)}>
            {viewPass ? "Ocultar" : "Ver"} contraseña
          </button>
          <strong
            className={`password-card-config ${viewPass ? "view-pass" : ""}`}>
           {chat.password}
          </strong>
        </div>
      </div>

      <img
        src={iconDelete}
        alt="delete icon trask"
        width={20}
        height={20}
        className="icon-delete"
        title={`Eliminar chat ${chat.title}`}
        onClick={() => deleteChat(chat.id)}
      />
    </div>
  );
};
