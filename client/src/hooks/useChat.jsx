import { useState, useEffect } from "react";
import { getShortDate, getLocalHour } from "format-all-dates";
import { useHandleUser } from "../contexts/ContextChat";
import io from "socket.io-client";
const socket = io("/");

export const useChat = (chatId) => {
  const { username } = useHandleUser();
  const [messages, setMessages] = useState([]);
  const [messageEnter, setMessageEnter] = useState("");

  useEffect(() => {
    socket.emit("join_chat", { chatId, username }, (res) => {
      if (res.ok) {
        setMessageEnter(res.msg);
        setTimeout(() => setMessageEnter(""), 3000);
      }
    });
    socket.emit("initial_data", chatId, (response) => {
      if (response) {
        setMessages(response);
      }
    });
  }, [chatId]);

  const sendMessage = (content, type) => {
    const date = `${getShortDate()} ${getLocalHour()}Hs`;
    const newMsg = { content, username, date, type };
    console.log(newMsg)
    socket.emit("send_message", { chatId, newMsg });
  };

  useEffect(() => {
    const handleNewMessage = (newMsg) => {
      setMessages((prevMessages) => [...prevMessages, newMsg]);
    };

    socket.on("message", handleNewMessage);

    return () => {
      socket.off("message", handleNewMessage);
    };
  }, [chatId]);

  return {
    sendMessage,
    messages,
    messageEnter,
  };
};
