import { URL_API } from "../utils/url_api";

export const getGlobalChats = async () => {
  const response = await fetch(`${URL_API}/global-chats`);
  const result = await response.json();
  return result;
};
