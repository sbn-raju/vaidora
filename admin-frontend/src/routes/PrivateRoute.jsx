import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({token, admin, children}) => {

  if (token == null || admin !== "Admin") {
    return <Navigate to={"/"} />;
  }

  if (token && admin !== "Admin") {
   return <Navigate to={"/unauthorized"} />;
  }
  
  return children ? children: <Outlet />
};

export default PrivateRoute;