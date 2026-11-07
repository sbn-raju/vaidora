import React, { useEffect } from 'react'
import HeaderHome from "../components/header/HeaderHome.jsx"
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'

const User_layout = () => {
  useEffect(() => {
    
  }, [])
  
  return (
    <>
    <HeaderHome/>
    <div className='flex flex-row'>
      <Sidebar />
      <Outlet/>
    </div>
    </> 
  )
}

export default User_layout