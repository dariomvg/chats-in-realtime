import { useState, useEffect } from "react";
import { getChatId } from "../helpers/getChatId";
import io from "socket.io-client";
import { useHandleUser } from "../contexts/ContextChat";
const socket = io("/");

export const useChat = (chatId) => {
  const { user: username } = useHandleUser();
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]);
  const [detailsChat, setDetailsChat] = useState({});

  const sendPassword = (password) => {
    return new Promise((resolve, reject) => {
      socket.emit("join_chat", { password, chatId, username }, (res) => {
        if (res.ok) {
          resolve(res.access);
        } else {
          setError(res.msg);
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      });
    });
  };

  const sendMessage = (message) => {
    const newMsg = { message, username };
    socket.emit("send_message", { chatId, newMsg });
  };

  useEffect(() => {
    socket.emit("initial_data", chatId, (response) => {
      setMessages(response);
    });
  }, [chatId]);

  useEffect(() => {
    const getDetailsChat = async () => {
      try {
        const res = await getChatId(chatId);
        if (res) setDetailsChat(res);
      } catch (error) {
        console.log(error);
      }
    };
    getDetailsChat();
  }, [chatId]);

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
    error,
    detailsChat,
    sendPassword,
    sendMessage,
    messages,
  };
};
