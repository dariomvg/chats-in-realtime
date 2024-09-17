import { useState, useEffect } from "react";
import { getChatId } from "../helpers/getChatId";
import io from "socket.io-client";
import { useHandleChat } from "../contexts/ContextChat";
const socket = io("/");

export const useChat = (chatId) => {

    const { user } = useHandleChat(); 
    const [error, setError] = useState("")
    const [accessUser, setAccessUser] = useState(false);
    const [password, setPassword] = useState("");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [detailsChat, setDetailsChat] = useState({})

    
    const handleSubmitPassword = (e) => {
      e.preventDefault();
      socket.emit("access_chat", { password, chatId, user }, (response) => {
        if (response.ok) {
          setAccessUser(response.access);
        } else {
          setError(response.msg);
        }
      });
      setPassword("");
    };
  
    const submitSendMessage = (e) => {
      e.preventDefault(); 
      const newMsg = {
        message,
        username: user,
      };
      setMessages([...messages, newMsg]);
      socket.emit("send_message", { chatId, newMsg });
      setMessage("");
    }
  
    useEffect(() => {
      const getDetailsChat = async () => {
        try {
          const data = await getChatId(chatId);
          const res = await data.json();
          if (res) setDetailsChat(res[0]);
        } catch (error) {
          console.log(error);
        }
      };
      getDetailsChat();
    }, [chatId]);
  
  
  const receiveMessage = (msg) => setMessages((state) => [...state, msg]);
  
    useEffect(() => {
      socket.emit("initialData", chatId, (response) => {
        setMessages(response)
      });
    }, [messages]);
  
    useEffect(() => {
      socket.on("message", receiveMessage);
      
      return () => {
        socket.off("message", receiveMessage);
      };
    }, []);


    return {error, detailsChat, accessUser, handleSubmitPassword, submitSendMessage, setPassword, messages, setMessage, message, user}
}