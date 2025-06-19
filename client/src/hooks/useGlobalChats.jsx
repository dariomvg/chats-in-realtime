import { useState, useEffect } from "react";
import { getGlobalChats } from "../helpers/get_global_chats.js";

export const useGlobalChats = () => {
  const [globalChats, setGlobalChats] = useState([]);
  useEffect(() => {
    const getAllGlobalChats = async () => {
      try {
        const localChats = await getGlobalChats();
        setGlobalChats(localChats);
      } catch (error) {
        console.log(error);
      }
    };
    getAllGlobalChats();
  }, []);

  return { globalChats };
};
