import { useHandleUser } from "../contexts/ContextChat";
import { getChats } from "../helpers/get_chats";
import { useState, useEffect } from "react";

export const useGetChats = () => {
  const [chats, setChats] = useState([]);
  const {username} = useHandleUser(); 

  useEffect(() => {
    const getAllChats = async () => {
      try {
        const localChats = await getChats(username);
        setChats(localChats);
      } catch (error) {
        console.log(error);
      }
    };
    getAllChats();
  }, [chats]);


  return { chats };
};
