import { httpClient } from "../utils/httpClient";

export const postReport = (data) => {
  return httpClient.post("/report", data);
};

export const getAllReports = (currentPage = 1, itemsPerPage = 10) => {
  return httpClient.get(
    `/report?pageNumber=${currentPage}&pageSize=${itemsPerPage}`
  );
};

export const getReport = (id) => {
  return httpClient.get(`/report/${id}`);
};

export const editReport = (id, data) => {
  return httpClient.put(`/report/${id}`, data);
};

export const deleteReport = (id) => {
  return httpClient.delete(`/report/${id}`);
};

export const getTotalSales = (startDate, endDate) => {
  return httpClient.get(
    `/report/totalsales?startDate=${startDate}&endDate=${endDate}`
  );
};
