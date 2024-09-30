import { useEffect, useState } from "react";
import UserContext from "./user.context";
import {
  doLoginToLocalStorage,
  doLogoutFromLcalStorage,
  getDataFromLocalStorage,
  getUserFromLocalStorage,
  isLoggedIn,
  isUserAdmin,
} from "../auth/helper.auth";

const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    setIsLogin(isLoggedIn());
    setUserData(getDataFromLocalStorage());
    setIsAdminUser(isUserAdmin());
  }, []);

  const doLogin = (data) => {
    doLoginToLocalStorage(data);
    setIsLogin(true);
    setUserData(getDataFromLocalStorage());
    setIsAdminUser(isUserAdmin());
  };

  const doLogout = () => {
    doLogoutFromLcalStorage();
    setIsLogin(false);
    setIsAdminUser(isUserAdmin());
    setUserData(null);
  };

  return (
    <UserContext.Provider
      value={{
        userData: userData,
        //setUserData: setUserData,
        //setIsLogin: setIsLogin,
        isLogin: isLogin,
        login: doLogin,
        logout: doLogout,
        isAdminUser: isAdminUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
