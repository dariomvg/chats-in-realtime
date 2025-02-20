import { useEffect, useState } from "react";
import { getChats } from "../helpers/getChats";
import { removeChat } from "../helpers/deleteChat";
import { useHandleUser } from "../contexts/ContextChat";
import { createNewChat } from "../helpers/createChat";

export const useHandleChats = () => {
  const [chats, setChats] = useState([]);
  const [error, setError] = useState("");
  const { user } = useHandleUser();

  const deleteChat = async (id) => {
    const response = await removeChat(id, user);

    if (!response.ok) {
      setError(response.message);
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    window.location.reload();
  };

  const createChat = async (data) => {
    await createNewChat({ ...data, creator: user });
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
  }, []);

  return { chats, deleteChat, createChat, error };
};
