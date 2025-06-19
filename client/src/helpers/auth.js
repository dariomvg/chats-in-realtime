import { URL_API as url_api } from "../utils/url_api";

export const checkSession = async () => {
  const response = await fetch(`${url_api}/check-session`, {
    method: "GET",
    credentials: "include",
  });
  const res = await response.json();
  return res;
};

export const loginUser = async (data) => {
  const response = await fetch(`${url_api}/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify(data),
  });
  const res = await response.json();
  return res;
};

export const signUpUser = async (data) => {
  const response = await fetch(`${url_api}/sign-up`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify(data),
  });
  const res = await response.json();
  return res;
};

export const logoutUser = async () => {
  const response = await fetch(`${url_api}/logout`, {
    method: "POST",
    credentials: "include",
  });
  const res = await response.json();
  return res;
};