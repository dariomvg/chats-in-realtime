import { createContext, useContext, useEffect,  useState } from "react";
import { createNewChat } from "../helpers/createChat";

const ContextChat = createContext();

export const useHandleChat = () => {
  const context = useContext(ContextChat);
  if (!context) throw new Error("Contexto inalcanzable");
  return context;
};

export default function ProviderChat({ children }) {
  const [user, setUser] = useState("");
  
  const loginUser = (username) => {
    setUser(username);
    localStorage.setItem("user", username); 
  };

  const createChat = async (data) => {
    data.creator = user;
    const response = await createNewChat(data);
  };

  useEffect(() => {
    const localUser = localStorage.getItem("user"); 
    if(localUser) {
      setUser(localUser);
    }
  }, [])
  
  return (
    <ContextChat.Provider value={{ createChat, loginUser, user }}>
      {children}
    </ContextChat.Provider>
  );
}
