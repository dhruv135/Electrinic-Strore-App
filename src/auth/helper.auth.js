export const doLoginToLocalStorage = (data) => {
  localStorage.setItem("userData", JSON.stringify(data));
};

export const getUserFromLocalStorage = () => {
  return getDataFromLocalStorage()?.user;
};

export const getTokenFromLocalStorage = () => {
  return getDataFromLocalStorage()?.jwtToken;
};

export const getDataFromLocalStorage = () => {
  const userData = localStorage.getItem("userData");
  if (userData !== null || userData !== undefined) {
    return JSON.parse(userData);
  }
  return null;
};

export const doLogoutFromLcalStorage = () => {
  localStorage.removeItem("userData");
};

export const isLoggedIn = () => {
  if (getTokenFromLocalStorage()) {
    return true;
  } else {
    return false;
  }
};

export const isUserAdmin = () => {
  if (isLoggedIn()) {
    const user = getUserFromLocalStorage();
    console.log(user);
    const roles = user.roles;
    console.log(user.roles);
    if (roles.find((role) => role.roleId === "wetrsdfwetwfasfwdf")) {
      console.log("admin user");
      return true;
    } else {
      console.log("not admin user");
      return false;
    }
  } else {
    return false;
  }
};
