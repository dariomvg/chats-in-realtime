import { URL_API } from "../utils/url_api";

export const removeChat = async (id, username) => {
  const response = await fetch(
    `${URL_API}/delete-chat?id=${id}&username=${username}`,
    { method: "DELETE" }
  );
  const res = await response.json(); 
  return res;
};
