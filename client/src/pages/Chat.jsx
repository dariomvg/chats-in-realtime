import { useParams } from "react-router-dom";
import "../styles/chat.css";
import { useChat } from "../hooks/useChat";

export const Chat = () => {

const { chatId } = useParams();
const { error, detailsChat, accessUser, handleSubmitPassword, submitSendMessage, setPassword, password, messages, setMessage, message, user } = useChat(chatId); 

  return (
    <section className="section-chat">
      <aside className="section-details">
        <h4>{detailsChat.title}</h4>
        <strong>{user}</strong>
        <p>Creado por {detailsChat.creator}</p>
        {detailsChat.creator === user && <strong>Contraseña: {detailsChat.password}</strong>}
      </aside>
      {!accessUser ? (
        <form onSubmit={handleSubmitPassword} className="form-pass">
          {error && <strong className="error">{error}</strong>}
          <input
            type="text"
            placeholder="Ingresa la contraseña del chat"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-pass"
          />
          <button type="submit" className="btn-pass">Ingresar</button>
        </form>
      ) : (
        <form className="form-chat" onSubmit={submitSendMessage}>
          <ul className="chat">
            {messages.map((item, i) => (
              <li key={i} className={`msg ${item.username === user ? "me" : "user"}`}>
                <p><b>{item.username}:</b> {item.messages}</p>
              </li>
            ))}
          </ul>
          <div className="controls-chat">
            <input
              type="text"
              placeholder="Escribe tu mensaje"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input-chat"
            />
            <button type="submit" className="btn-chat">Enviar</button>
          </div>
        </form>
      )}
    </section>
  );
};
