import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const DoctorPrivateRoute = ({token, user, children}) => {
    if (token == null || user !== "DoctorAdmin") {
        return <Navigate to={"/"} />;
      }
    
      if (token && user !== "DoctorAdmin") {
       return <Navigate to={"/"} />;
      }
      
      return children ? children: <Outlet />
}

export default DoctorPrivateRoute