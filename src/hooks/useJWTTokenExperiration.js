import React, { useContext, useEffect, useState } from "react";
import { getTokenFromLocalStorage } from "../auth/helper.auth";
import { isJwtExpired } from "jwt-check-expiration";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../context/user.context";

function useJWTTokenExperiration() {
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);
  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token !== undefined || token.trim() !== null) {
      if (isJwtExpired(token)) {
        console.log("Token Is Expired");
        setFlag(true);
        toast.error("Session Expired Please ReLogin");
        logout();
        navigate("/login");
      }
    }
  }, []);

  return flag;
}

export default useJWTTokenExperiration;
