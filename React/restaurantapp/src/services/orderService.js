import { httpClient } from "../utils/httpClient";

export const postOrder = (data) => {
  return httpClient.post("/order", data);
};

export const getAllOrders = (currentPage = 1, itemsPerPage = 10) => {
  return httpClient.get(
    `/order?pageNumber=${currentPage}&pageSize=${itemsPerPage}`
  );
};

export const getOrder = (id) => {
  return httpClient.get(`/order/${id}`);
};

export const editOrder = (id, data) => {
  return httpClient.put(`/order/${id}`, data);
};

export const deleteOrder = (id) => {
  return httpClient.delete(`/order/${id}`);
};

// For OrderItem

export const postOrderItem = (data) => {
  return httpClient.post("/orderitem", data);
};

export const getAllOrderItems = () => {
  return httpClient.get(`/orderitem`);
};

export const getOrderItem = (id) => {
  return httpClient.get(`/orderitem/${id}`);
};

export const getAllOrderItemsByOrderId = (orderId) => {
  return httpClient.get(`/orderitem/orderId/${orderId}`);
};

export const editOrderItem = (id, data) => {
  return httpClient.put(`/orderitem/${id}`, data);
};

export const deleteOrderItem = (id) => {
  return httpClient.delete(`/orderitem/${id}`);
};
