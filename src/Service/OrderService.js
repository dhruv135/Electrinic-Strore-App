import { privateAxois } from "./axios.service";

export const getAllOrders = async (currentPage, pageSize, sortBy, sortDir) => {
  let response = await privateAxois.get(
    `/orders?pageNumber=${currentPage}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
  );
  return response.data;
};

export const updateOrder = async (order, orderId) => {
  const response = await privateAxois.put(`/orders/${orderId}`, order);
  return response.data;
};

export const createOrder = async (orderDetail) => {
  const response = await privateAxois.post(`/orders`, orderDetail);
  return response.data;
};

export const getOrdersOfUser = async (userId) => {
  const resposne = await privateAxois.get(`/orders/users/${userId}`);
  return resposne.data;
};
