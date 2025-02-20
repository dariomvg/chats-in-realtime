import { useParams } from "react-router-dom";
import { useChat } from "../hooks/useChat";
import { useState } from "react";
import "../styles/chat.css";
import { CardMessage } from "../components/CardMessage";

export const Chat = () => {
  const { chatId } = useParams();
  const [message, setMessage] = useState("");
  const { sendMessage, messages } = useChat(chatId);

  const submitMessage = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  return (
    <section className="section-chat">
      <form className="form-chat" onSubmit={submitMessage}>
        <ul className="chat">
          {messages.length > 0 &&
            messages.map((item, i) => (
              <CardMessage key={i} message={item} />
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
          <button type="submit" className="btn-chat">
            Enviar
          </button>
        </div>
      </form>
    </section>
  );
};
