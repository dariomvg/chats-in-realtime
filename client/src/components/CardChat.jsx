import { Link } from "react-router-dom";
import "../styles/card-chat.css";

export const CardChat = ({ card, deleteChat }) => {
  return (
    <div key={card.id} className="card">
      <div className="header-card">
        <h3>{card.title}</h3>
        <img
          src="/trask.svg"
          alt="delete icon trask"
          width={20}
          height={20}
          className="icon-delete"
          onClick={() => deleteChat(card.id)}
        />
      </div>
      <strong>{card.creator}</strong>
      <Link to={`/password/${card.id}`} className="link-card">
        Ir al chat
      </Link>
    </div>
  );
};
