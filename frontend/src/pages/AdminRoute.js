import React from "react";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {

  const role =
    localStorage.getItem("role");

  const username =
    localStorage.getItem("username");

  const isLoggedIn =
    !!username;

  if (!isLoggedIn) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }

  if (role !== "ADMIN") {

    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );

  }

  return children;
}

export default AdminRoute;