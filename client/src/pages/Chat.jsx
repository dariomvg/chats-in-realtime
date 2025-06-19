import { useParams } from "react-router-dom";
import { useChat } from "../hooks/useChat";
import { useState } from "react";
import "../styles/chat.css";
import { CardMessage } from "../components/CardMessage";
import iconSend from "../assets/send.svg";
import iconEmoji from "../assets/emoji.svg";
import { emojis } from "../utils/emojis";
import { Audio } from "../components/Audio";
import { CardAudio } from "../components/CardAudio";

export const Chat = () => {
  const { chatId } = useParams();
  const { sendMessage, messages, messageEnter } = useChat(chatId);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);

  const submitAudio = async (buffer) => {
    sendMessage(buffer, "audio")
  }

  const submitMessage = (e) => {
    e.preventDefault();
    if (message.length >= 500) {
      setError("El mensaje superó los 500 caracteres");
      setTimeout(() => setError(""), 5000);
      return;
    } else {
      setMessage("");
      sendMessage(message, "message");
    }
  };

  return (
    <section className="section-chat">
      <p className={`message-enter ${messageEnter ? "show-msg-enter" : ""}`}>
        {messageEnter}
      </p>
      <div className="container-chat">
        <ul className="container-messages-chat">
          {messages.length > 0 &&
            messages.map(({ id, content, username, date, type }) =>
              type === "audio" ? (
                <CardAudio
                  key={id}
                  content={content}
                  username={username}
                  date={date}
                />
              ) : (
                <CardMessage
                  key={id}
                  content={content}
                  username={username}
                  date={date}
                />
              )
            )}
        </ul>
        <form className="form-chat" onSubmit={submitMessage}>
          {error && <p className="error-message">{error}</p>}
          <div className="controls-chat">
            <textarea
              type="text"
              placeholder="Escribe tu mensaje"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="textarea-chat"
              required
              rows={3}
            />
            <div
              className={`container-emojis ${showEmojis ? "show-emojis" : ""}`}>
              {emojis.map(({ id, content }) => (
                <span
                  key={id}
                  className="emoji"
                  onClick={() =>
                    setMessage((prevState) => prevState + content)
                  }>
                  {content}
                </span>
              ))}
            </div>
            <button
              type="button"
              className="btn-chat"
              onClick={() => setShowEmojis(!showEmojis)}>
              <img src={iconEmoji} alt="icon emoji" width={25} height={25} />
            </button>
            <Audio submitAudio={submitAudio} />
            <button type="submit" className="btn-chat">
              <img src={iconSend} alt="icon send" width={25} height={25} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
