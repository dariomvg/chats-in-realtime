import { createContext, useContext, useEffect, useState } from "react";
import { logout } from "../helpers/logOut";

const ContextChat = createContext();

export const useHandleUser = () => {
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

  const logoutUser = () => {
    logout();
    setUser("");
  };

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(localUser);
    }
  }, [user]);

  return (
    <ContextChat.Provider value={{ loginUser, user, logoutUser }}>
      {children}
    </ContextChat.Provider>
  );
}
