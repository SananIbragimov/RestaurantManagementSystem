import { httpClient } from "../utils/httpClient";

export const postTable = (data) => {
  return httpClient.post("/table", data);
};

export const getAllTables = (currentPage = 1, itemsPerPage = 10) => {
  return httpClient.get(
    `/table?pageNumber=${currentPage}&pageSize=${itemsPerPage}`
  );
};

export const getTable = (id) => {
  return httpClient.get(`/table/${id}`);
};

export const editTable = (id, data) => {
  return httpClient.put(`/table/${id}`, data);
};

export const deleteTable = (id) => {
  return httpClient.delete(`/table/${id}`);
};
