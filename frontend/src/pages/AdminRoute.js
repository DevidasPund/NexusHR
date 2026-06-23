import React from "react";
import {
 Navigate
} from "react-router-dom";

function AdminRoute({
 children
}) {

 const role =
 localStorage.getItem(
   "role"
 );

 return role === "ADMIN"
 ? children
 : <Navigate to="/" />;
}

export default AdminRoute;