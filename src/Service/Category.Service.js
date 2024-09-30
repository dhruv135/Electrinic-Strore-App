import { privateAxois } from "./axios.service";

export const addCategory = (categorie) => {
  return privateAxois
    .post(`/categories`, categorie)
    .then((response) => response.data);
};

export const getCategories = (currentPage = 0, pageSize = 10) => {
  return privateAxois
    .get(`/categories?pageNumber=${currentPage}&&pageSize=${pageSize}`)
    .then((response) => response.data);
};

export const deleteCategory = (categorieId) => {
  return privateAxois
    .delete(`/categories/${categorieId}`)
    .then((response) => response.data);
};

export const updateCategory = (categorie) => {
  console.log(categorie);
  return privateAxois
    .put(`/categories/${categorie.categoryId}`, categorie)
    .then((response) => response.data);
};
