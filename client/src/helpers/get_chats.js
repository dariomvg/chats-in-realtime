import { URL_API } from "../utils/url_api";

export const getChats = async (creator) => {
    const response = await fetch(`${URL_API}/chats?creator=${creator}`);
    const res = await response.json(); 
    return res;
}