import { privateAxois } from "./axios.service";

export const getCart = (userId) => {
  return privateAxois.get(`/carts/${userId}`).then((response) => {
    return response.data;
  });
};

export const addItemToCart = (userId, productId, quantity) => {
  return privateAxois
    .post(`/carts/${userId}`, {
      productId,
      quantity,
    })
    .then((response) => {
      return response.data;
    });
};

export const clearCart = (userId) => {
  return privateAxois.delete(`/carts/${userId}`).then((response) => {
    return response.data;
  });
};

export const removeItemFromCart = (userId, itemId) => {
  return privateAxois
    .delete(`/carts/${userId}/items/${itemId}`)
    .then((response) => {
      return response.data;
    });
};
