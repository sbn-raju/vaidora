import React from 'react'
import HeaderAdmin from '../components/HeaderAdmin.jsx'
import { Outlet } from 'react-router-dom'
import Sidebar from "../components/Sidebar.jsx";

const Admin_Layout = () => {
  return (
   <>
   <HeaderAdmin/>
   <div className='flex flex-row'>
   <Sidebar/>
   <Outlet/>
   </div>
   </>
  )
}

export default Admin_Layout