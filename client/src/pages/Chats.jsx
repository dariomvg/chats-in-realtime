import { Link } from "react-router-dom";
import "../styles/chats.css";
import {CardAsideChat} from "../components/CardAsideChat"
import { useGetChats } from "../hooks/useGetChats";

export const Chats = () => {
  const {chats} = useGetChats()

  return (
    <section className="section-cards">
        <section className="list-cards">
          {chats.length > 0 ? (
            chats.map(({id, title}) => (
             <CardAsideChat key={id} title={title} id={id} />
            ))
          ) : (
            <div className="box-create">
              <p>No hay chat creados</p>
              <Link to="/nuevo-chat" className="link-create">
                Crear chat
              </Link>
            </div>
          )}
        </section>
    </section>
  );
};
