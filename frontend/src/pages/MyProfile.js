import React from "react";

import AdminProfile from "./AdminProfile";
import ManagerProfile from "./ManagerProfile";
import EmployeeProfile from "./EmployeeProfile";

function Profile() {

  const role =
    localStorage.getItem("role");

  if (role === "ADMIN") {
    return <AdminProfile />;
  }

  if (role === "MANAGER") {
    return <ManagerProfile />;
  }

  return <EmployeeProfile />;
}

export default Profile;