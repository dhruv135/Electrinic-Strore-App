import { privateAxois } from "./axios.service";

export const createProductWithOutCategory = (product) => {
  return privateAxois
    .post(`/products`, product)
    .then((response) => response.data);
};

export const createProductInCategory = (product, categoryId) => {
  return privateAxois
    .post(`/categories/${categoryId}/products`, product)
    .then((response) => response.data);
};

export const addProductImage = (file, productId) => {
  const formData = new FormData();
  formData.append("productImage", file);

  return privateAxois
    .post(`/products/image/${productId}`, formData)
    .then((response) => {
      return response.data;
    });
};

// get products

export const getAllproducts = (
  pageNumber = 0,
  pageSize = 10,
  sortBy = "addedDate",
  sortDir = "asc"
) => {
  return privateAxois
    .get(
      `/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
    )
    .then((response) => response.data);
};

// DELETE THE PRODUCT

export const deleteProduct = (productId) => {
  return privateAxois
    .delete(`/products/${productId}`)
    .then((response) => response.data);
};

// update product

export const updateProductService = (data, productId) => {
  return privateAxois.put(`/products/${productId}`, data).then((response) => {
    return response.data;
  });
};

///categories/{categoryId}/products/{productId}

export const updateProductCategory = (categoryId, productId) => {
  return privateAxois
    .put(`categories/${categoryId}/products/${productId}`)
    .then((response) => {
      return response.data;
    });
};

export const searchProduct = (query) => {
  return privateAxois
    .get(`/products/search/${query}`)
    .then((response) => response.data);
};

//
export const getSingleProduct = (productId) => {
  return privateAxois
    .get(`/products/${productId}`)
    .then((response) => response.data);
};

export const getProductsByCategory = (
  categoryId,
  pageNumber = 0,
  pageSize = 10,
  sortBy = "addedDate",
  sortDir = "asc"
) => {
  return privateAxois
    .get(
      `/categories/${categoryId}/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
    )
    .then((response) => {
      return response.data;
    });
};
