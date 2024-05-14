import { httpClient } from "../utils/httpClient";

export const postLogin = (data) => {
  return httpClient.post("/account/login", data);
};

export const logout = () => {
  return httpClient.post("/account/logout");
};
