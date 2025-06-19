import { useState } from "react";
import { removeChat } from "../helpers/delete_chat";
import { useHandleUser } from "../contexts/ContextChat";
import { createNewChat } from "../helpers/create_chat";
import { changeGlobal } from "../helpers/change_global";
import { getSecondDate, getLocalHour } from "format-all-dates";

export const useHandleChats = () => {
  const [error, setError] = useState("");
  const { username } = useHandleUser();

  const deleteChat = async (id) => {
    const response = await removeChat(id, username);

    if (!response.ok) {
      setError(response.message);
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
  };

  const createChat = async (data) => {
    const date = `${getSecondDate()}, ${getLocalHour()}Hs`;
    await createNewChat({ ...data, creator: username, date });
  };

  const changeGlobalChat = async (global, id) => {
    await changeGlobal(global, id);
  };

  return {
    deleteChat,
    createChat,
    changeGlobalChat,
    error,
  };
};
