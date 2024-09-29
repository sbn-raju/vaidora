import React from 'react'
import HeaderHome from '../components/header/HeaderHome.jsx'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer.jsx'

const MainLayout = () => {
  return (
    <>
    <HeaderHome/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default MainLayout