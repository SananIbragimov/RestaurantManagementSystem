import { httpClient } from "../utils/httpClient";

export const postProduct = (data) => {
  return httpClient.post("/product", data);
};

export const getAllProducts = (currentPage, itemsPerPage) => {
  return httpClient.get(
    `/product?pageNumber=${currentPage}&pageSize=${itemsPerPage}`
  );
};

export const getProduct = (id) => {
  return httpClient.get(`/product/${id}`);
};

export const getProductByName = (name) => {
  return httpClient.get(`/product/name/${name}`);
};

export const getProductByPrice = (min, max, currentPage, itemsPerPage) => {
  return httpClient.get(
    `/product/price?min=${min}&max=${max}&pageNumber=${currentPage}&pageSize=${itemsPerPage}`
  );
};

export const editProduct = (id, data) => {
  return httpClient.put(`/product/${id}`, data);
};

export const deleteProduct = (id) => {
  return httpClient.delete(`/product/${id}`);
};
