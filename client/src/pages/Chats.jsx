import { Link } from "react-router-dom";
import "../styles/chats.css";
import { useGetChats } from "../hooks/useGetChats";

export const Chats = () => {
  const { chats, deleteChat } = useGetChats();

  return (
    <section className="section-cards">
      <section className="cards">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <div key={chat.id} className="card">
              <div className="header-card">
                <h3>{chat.title}</h3>
                <img src="/trask.svg" alt="delete icon trask" width={20} height={20} className="icon-delete" onClick={() => deleteChat(chat.id)} />
              </div>  
              <strong>{chat.creator}</strong>
              <Link to={`/chat/${chat.id}`} className="link-card">
                Ir al chat
              </Link>
            </div>
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
    </section>
  );
};
