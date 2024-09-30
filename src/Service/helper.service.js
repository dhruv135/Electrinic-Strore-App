export const BASE_URL = "http://localhost:9090";

export const getProductImageUrl = (productId) => {
  return BASE_URL + `/products/image/${productId}`;
};

export const getUserImageUrl = (userId) => {
  return BASE_URL + `/users/image/${userId}`;
};
