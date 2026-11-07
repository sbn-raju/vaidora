import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, useEffect } from "react";
import MainLayout from "./layouts/MainLayout.jsx"
import User_layout from "./layouts/User_Layout.jsx";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/Public Pages/HomePage.jsx";
import AboutPage from "./pages/Public Pages/AboutPage.jsx";
import AppointmentPage from "./pages/Public Pages/AppointmentPage.jsx"
import TermsAndConditionPage from "./pages/Public Pages/HomePage.jsx";
import ServicesPage from "./pages/Public Pages/ServicesPage.jsx";
import DietPage from "./pages/Public Pages/DietPage.jsx";
import ClassPage from "./pages/Public Pages/ClassPage.jsx"

import MyAppointmentsPage from './pages/User Dashboard Pages/MyAppointmentsPage';
import MyPaymentsPage from './pages/User Dashboard Pages/MyPaymentsPage';
import MyClassesPage from './pages/User Dashboard Pages/MyClassesPage';
import MyProfilePage from "./pages/User Dashboard Pages/MyProfilePage.jsx";

import Loading from './components/common/Loading.jsx';
import Missing from "./components/common/Missing.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { useDispatch, useSelector } from "react-redux";
import MobileInput from "./components/MobileInput.jsx";
import { decryptAndVerify } from "./slices/userSlice.js";


function App() {

const dispatch = useDispatch();

  useEffect(() => {
    const initialState = async()=>{
    await dispatch(decryptAndVerify());
  }
  
    initialState();
  }, [dispatch])
  
 
  const {token, user, loading, error} = useSelector((state)=> state.auth)


  if(loading){
    return <Loading/>
  }

  if(error){
    return <Missing/>
  }


  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Routing for the main pages like Home, Services and etc. All this are the Public Routes*/}
          <Route path="/user/login" element={<MobileInput/>}/>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/term" element={<TermsAndConditionPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/diet" element={<DietPage />} />
            <Route
              path="/class"
              element={
                <ProtectedRoute isAuthenticated={token != null ? true : false} user={user == "userRoleAsTheCustomer" ? true : false}>
                  <ClassPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointment"
              element={
                <ProtectedRoute isAuthenticated={token != null ? true : false} user={user == "userRoleAsTheCustomer" ? true : false}>
                  <AppointmentPage />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Routing for the user dash Boards pages like Profile and payments and etc. */}
          {/* This are the protected Routes */}

          <Route
            element={
              <ProtectedRoute isAuthenticated={ token? true : false}>
                <User_layout />
              </ProtectedRoute>
            }
          >
            <Route path="/user/appointment" element={<MyAppointmentsPage />} />
            <Route path="/user/profile" element={<MyProfilePage />} />
            <Route path="/user/payment" element={<MyPaymentsPage />} />
            <Route path="/user/class" element={<MyClassesPage />} />
          </Route>

          <Route path="*" element={<Missing />}></Route>
        </Routes>
        <Toaster position={"top-right"} />
      </Suspense>
    </BrowserRouter>
  );
}

export default App
