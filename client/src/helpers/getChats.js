import { URL_API } from "../utils/url_api";

export const getChats = async () => {
    const response = await fetch(`${URL_API}/chats`);
    const res = await response.json(); 
    return res;
}