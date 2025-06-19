import { URL_API } from "../utils/url_api";

export const getChatId = async (id) => {
    const response = await fetch(`${URL_API}/unique-chat?id=${id}`);
    const res = await response.json();
    return res[0]; 
}