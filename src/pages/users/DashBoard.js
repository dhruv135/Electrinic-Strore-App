import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../../context/user.context";
import { isLoggedIn } from "../../auth/helper.auth";

function Dashboard() {
  const userContext = useContext(UserContext);

  const viewDashBoard = () => {
    return (
      <div>
        {/* <div>This is Dashboard page</div> */}
        <Outlet />
      </div>
    );
  };

  return isLoggedIn() ? viewDashBoard() : <Navigate to="/login"></Navigate>; //userContext.isLogin ? viewDashBoard() : <h1>You are not Logged in</h1>;
}

export default Dashboard;
