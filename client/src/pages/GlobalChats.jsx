import { useGlobalChats } from "../hooks/useGlobalChats";
import "../styles/global-chats.css";
import { CardAsideChat } from "../components/CardAsideChat";

export const GlobalChats = () => {
  const { globalChats } = useGlobalChats();

  return (
    <main className="main-global-chats">
      <h1 className="title-global-chats">Chats globales</h1>
      <section className="section-global-chats">
        {globalChats.length > 0 ? (
          globalChats.map(({ id, title }) => (
            <CardAsideChat key={id} id={id} title={title} />
          ))
        ) : (
          <h3>No hay chats globales</h3>
        )}
      </section>
    </main>
  );
};