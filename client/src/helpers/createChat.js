import { URL_API } from "../utils/url_api";

export const createNewChat = async (data) => {
    const response = await fetch(`${URL_API}/create-chat`, {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(data),
    });
    return response.ok
}