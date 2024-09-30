import { privateAxois, publicAxios } from "./axios.service";

export const registerUser = (userData) => {
  return publicAxios.post("/users", userData).then((response) => response.data);
};

export const loginUser = (userData) => {
  return publicAxios
    .post("/auth/login", userData)
    .then((response) => response.data);
};

export const getUser = (userId) => {
  return publicAxios.get(`/users/${userId}`).then((response) => response.data);
};

export const updateUser = (user) => {
  console.log(user);
  return privateAxois
    .put(`/users/${user.userId}`, user)
    .then((response) => response.data);
};

export const updateUserProfileImage = (file, userId) => {
  if (file === null) {
    return;
  }
  const data = new FormData();
  data.append("userImage", file);
  return privateAxois.post(`/users/image/${userId}`, data).then((response) => {
    return response.data;
  });
};

export const getALlUsers = (pageNumber, pageSize, sortBy, sortDir) => {
  return privateAxois
    .get(
      `/users?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
    )
    .then((response) => response.data);
};
