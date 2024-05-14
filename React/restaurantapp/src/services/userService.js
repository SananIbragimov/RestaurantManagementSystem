import { httpClient } from "../utils/httpClient";

export const getAllUsers = (currentPage = 1, itemsPerPage = 10) => {
  return httpClient.get(
    `/user?pageNumber=${currentPage}&pageSize=${itemsPerPage}`
  );
};

export const getUser = (id) => {
  return httpClient.get(`/user/${id}`);
};

export const editUser = (id, data) => {
  return httpClient.put(`/user/${id}`, data);
};

export const deleteUser = (id) => {
  return httpClient.delete(`/user/${id}`);
};
