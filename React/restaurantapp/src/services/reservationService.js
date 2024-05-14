import { httpClient } from "../utils/httpClient";

export const postReservation = (data) => {
  return httpClient.post("/reservation", data);
};

export const getAllReservations = (currentPage = 1, itemsPerPage = 10) => {
  return httpClient.get(
    `/reservation?pageNumber=${currentPage}&pageSize=${itemsPerPage}`
  );
};

export const getReservation = (id) => {
  return httpClient.get(`/reservation/${id}`);
};

export const editReservation = (id, data) => {
  return httpClient.put(`/reservation/${id}`, data);
};

export const deleteReservation = (id) => {
  return httpClient.delete(`/reservation/${id}`);
};
