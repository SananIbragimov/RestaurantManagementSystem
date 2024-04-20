import { httpClient } from "../utils/httpClient";

export const postMenu = (data) => {
  return httpClient.post("/menu", data);
};

export const getAllMenus = (currentPage = 1, itemsPerPage = 10) => {
  return httpClient.get(`/menu?pageNumber=${currentPage}&pageSize=${itemsPerPage}`);
};

export const getMenu = (id) => {
  return httpClient.get(`/menu/${id}`);
};

export const editMenu = (id, data) => {
  return httpClient.put(`/menu/${id}`, data);
};

export const deleteMenu = (id) => {
  return httpClient.delete(`/menu/${id}`);
};

// For MenuItem

export const postMenuItem = (data) => {
    return httpClient.post("/menuitem", data );
  };
  
  export const getAllMenuItems = () => {
    return httpClient.get(`/menuitem`);
  };
  
  export const getMenuItem = (id) => {
    return httpClient.get(`/menuitem/${id}`);
  };

  export const getAllMenuItemsByMenuId = (menuId) => {
    return httpClient.get(`/menuitem/menuId/${menuId}`);
  };
  
  
  export const editMenuItem = (id, data) => {
    return httpClient.put(`/menuitem/${id}`, data);
  };
  
  export const deleteMenuItem = (id) => {
    return httpClient.delete(`/menuitem/${id}`);
  };