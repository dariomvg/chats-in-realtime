import { Link } from "react-router-dom";
import "../styles/chats.css";
import { useHandleChats } from "../hooks/useHandleChats";
import { CardChat } from "../components/CardChat";

export const Chats = () => {
  const { chats, deleteChat, error } = useHandleChats();

  return (
    <section className="section-cards">
      {error && <strong className="message-cards">{error}</strong>}
      <div className="container-cards">
        <section className="cards">
          {chats.length > 0 ? (
            chats.map((card) => (
              <CardChat key={card.id} card={card} deleteChat={deleteChat} />
            ))
          ) : (
            <div className="box-create">
              <p>No hay chat creados</p>
              <Link to="/crear" className="link-create">
                Crear chat
              </Link>
            </div>
          )}
        </section>
      </div>
    </section>
  );
};
