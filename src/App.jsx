import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Suspense, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";


//Layouts
import PrivateRoute from "./routes/PrivateRoute.jsx";
import Admin_Layout from "./layouts/Admin_Layout.jsx";

//Pages
import AdminLogin from "./pages/AdminLogin.jsx";
import AddDoctorPage from "./pages/AddDoctorPage.jsx";
import AppointmentsPage from "./pages/AppointmentsPage.jsx";
import ClassBookingPage from "./pages/ClassBookingPage.jsx";
import ClassUpdatesPage from "./pages/ClassUpdatesPage.jsx";
import Notifications from "./pages/Notifications.jsx";
import PaymentPage from "./pages/PaymentsPage.jsx";
import SetSlotsPage from "./pages/SetSlotsPage.jsx";
import UserDataPage from "./pages/UserDataPage.jsx";
import YoutubeVideosPage from "./pages/YoutubeVideosPage.jsx";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import Missing from "./pages/Missing.jsx";


//Components
import Loading from "./components/Loading.jsx"
import WhataAppMessanger from "./components/WhataAppMessanger.jsx"
import { decryptTheDataAndInitilse } from "./slices/adminSlice.js";


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const initialState = async()=>{
      await dispatch(decryptTheDataAndInitilse())
    }
    initialState();
  }, [dispatch])
  
  const {token, admin, loading, error} = useSelector((state)=>state.adminAuth);

  if(loading){
    return <Loading/>
  }
 
  if(error){
    return <UnauthorizedPage/>
  }

  return (
    <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<AdminLogin />} />
            <Route
              element={
                <PrivateRoute token={token != null ? token : null} admin={admin === "Admin" ? admin : null}>
                  <Admin_Layout />
                </PrivateRoute>
              }
            >
              <Route path="/admin/addDoctor" element={<AddDoctorPage />} />
              <Route path="/admin/appointment" element={<AppointmentsPage />} />
              <Route path="/admin/whatsapp" element={<WhataAppMessanger />} />
              <Route path="/admin/payment" element={<PaymentPage />} />
              <Route path="/admin/classbooked" element={<ClassBookingPage />} />
              <Route path="/admin/slots" element={<SetSlotsPage />} />
              <Route path="/admin/class" element={<ClassUpdatesPage />} />
              <Route path="/admin/youtube" element={<YoutubeVideosPage />} />
              <Route path="/admin/users" element={<UserDataPage />} />
              <Route path="/admin/notifications" element={<Notifications />}/>
            </Route>
            <Route path="*" element={<Missing />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
          </Routes>
          <Toaster position={"top-right"} />
      </Suspense>
    </BrowserRouter>
  )
}

export default App
