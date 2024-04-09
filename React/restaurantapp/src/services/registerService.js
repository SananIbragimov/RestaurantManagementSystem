import { httpClient } from "../utils/httpClient";

export const postRegister = (data, token) => {
  return httpClient.post("/account/register", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};