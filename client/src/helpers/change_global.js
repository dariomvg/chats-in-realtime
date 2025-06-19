import { URL_API } from "../utils/url_api";

export const changeGlobal = async (global, id) => {
    const response = await fetch(`${URL_API}/change-global`, {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({global, id}),
    });
    return response.ok
}