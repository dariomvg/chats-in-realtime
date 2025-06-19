import "../styles/home-chat.css";
import pictureMain from "../assets/picture-main.svg";

export const HomeChat = () => {
  return (
    <section className="section-main-chat">
      <img
        src={pictureMain}
        alt="picture main chats"
        className="image-main-chat"
        width={400}
        height={420}
      />
      <h2 className="title-main-chat">Tu chats</h2>
      <p className="detail-main-chat">
        Envia mensajes cuando quieras. Crea e invita a otros compartiendo la
        contraseña de tus chats ó colocalo global para todo el mundo{" "}
      </p>
    </section>
  );
};
