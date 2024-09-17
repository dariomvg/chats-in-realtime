import { useEffect, useState } from "react";
import { getChats } from "../helpers/getChats";
import { removeChat } from "../helpers/deleteChat";

export const useGetChats = () => {
    const [chats, setChats] = useState([]);

    const deleteChat = async (id) => {
      await removeChat(id);
    };

    useEffect(() => {
      const getAllChats = async () => {
        try {
          const localChats = await getChats();
          setChats(localChats);
        } catch (error) {
          console.log(error);
        }
      };
      getAllChats();
    }, [chats]);

    return {chats, deleteChat}
}