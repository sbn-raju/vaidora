  import React from 'react'
  import { Navigate, Outlet } from 'react-router-dom'

  const ProtectedRoute = ({isAuthenticated, user, children}) => {
    if(!isAuthenticated){
      return <Navigate to={"/"}/>
    }

    if(user == "userRoleAsTheCustomer"){
      return <Navigate to={"/"}/>
    }

    return children?children:<Outlet/>
    
  }

  export default ProtectedRoute