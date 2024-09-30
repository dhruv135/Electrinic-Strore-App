import React, { useContext } from "react";
import UserContext from "../context/user.context";

function Dashboard() {
  const userContext = useContext(UserContext);

  return (
    <div>
      This is Dashboard page
      <h1>Welcome {userContext.userData?.user?.name}</h1>
    </div>
  );
}

export default Dashboard;
