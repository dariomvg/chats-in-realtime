import { useState } from "react";
import { CardConfigChat } from "../components/CardConfigChat";
import { useHandleUser } from "../contexts/ContextChat";
import { useHandleChats } from "../hooks/useHandleChats";
import "../styles/config.css";
import { useGetChats } from "../hooks/useGetChats";

export const Config = () => {
  const { deleteChat, changeGlobalChat, error } = useHandleChats();
  const { chats } = useGetChats();
  const { username } = useHandleUser();

  return (
    <main className="page-config">
      <h1 className="username-page-config">{username}</h1>
      {error && <strong className="message-cards">{error}</strong>}
      <section className="section-chats-config">
        {chats.length > 0 &&
          chats.map((chat) => (
            <CardConfigChat
              key={chat.id}
              chat={chat}
              deleteChat={deleteChat}
              changeGlobal={changeGlobalChat}
            />
          ))}
      </section>
    </main>
  );
};
