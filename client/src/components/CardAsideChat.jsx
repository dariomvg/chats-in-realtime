import { Link } from "react-router-dom";
import "../styles/card-aside-chat.css";

export const CardAsideChat = ({ id, title }) => {
  return (
    <Link to={`/chats/chat/${id}`} className="card-aside">
      {title}
    </Link>
  );
};
