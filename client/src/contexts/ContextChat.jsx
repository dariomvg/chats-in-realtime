import { createContext, useContext, useEffect, useState } from "react";
import {
  checkSession,
  loginUser,
  logoutUser,
  signUpUser,
} from "../helpers/auth";

const ContextChat = createContext();

export const useHandleUser = () => {
  const context = useContext(ContextChat);
  if (!context) throw new Error("Contexto inalcanzable");
  return context;
};

export default function ProviderChat({ children }) {
  const [username, setUsername] = useState("");
  const [messageLogin, setMessageLogin] = useState("");
  const [messageSign, setMessageSign] = useState("");
  const [msgUserSign, setMsgUserSign] = useState("");

  const login = async (user) => {
    const data = await loginUser(user);
    if (!data.ok) {
      setMessageLogin(data.detail);
      setTimeout(() => {
        setMessageLogin("");
      }, 5000);
      return;
    }
    setUsername(data.username);
    return data;
  };

  const signUp = async (user) => {
    const data = await signUpUser(user);
    if (!data.ok) {
      setMessageSign(data.detail);
      setTimeout(() => {
        setMessageSign("");
      }, 5000);
      return;
    }
    setMsgUserSign("Usuario agregado. Inicia sesión");
    setTimeout(() => {
      setMsgUserSign("");
    }, 5000);
  };

  const logOut = async () => {
    const data = await logoutUser();
    if (data.ok) {
      setUsername("");
    }
    return data;
  };

  useEffect(() => {
    const checkUserSession = async () => {
      const data = await checkSession();
      if (!data.ok) {
        return;
      }
      setUsername(data.username);
    };
    checkUserSession();
  }, []);

  return (
    <ContextChat.Provider
      value={{
        username,
        login,
        signUp,
        logOut,
        setMessageSign,
        messageSign,
        messageLogin,
        msgUserSign,
      }}>
      {children}
    </ContextChat.Provider>
  );
}
