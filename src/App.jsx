import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import { Suspense, useEffect } from "react";
import Loading from "./components/Loading.jsx";
import DoctorPrivateRoute from "./routes/DoctorPrivateRoute.jsx";
import Doctor_Layout from "./layouts/Doctor_Layout.jsx";
import DoctorAppointments from "./pages/DoctorAppointments.jsx";
import DoctorLogin from "./pages/DoctorLogin.jsx";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Missing from './components/Missing.jsx';
import { decryptDataAndInitialize } from './slices/doctorSlice.js';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initialState = async()=>{
      await dispatch(decryptDataAndInitialize());
    }
  
    initialState();
  }, [dispatch])
  

  const {token, user, loading, error} = useSelector((state)=>state.doctorAuth);

  if(loading){
    return <Loading/>
  }

  if(error){
    return <p>Error..</p>
  }


  return (
    <Router>
          <Suspense fallback={<Loading />}>
            <Routes>
              {/* Public Routes */}
              <Route path='/' element={<DoctorLogin />} />
              
              {/* Protected Routes */}
              <Route
                element={
                  <DoctorPrivateRoute token={token != null ? token : null} user={user === "DoctorAdmin" ? user : null}>
                    <Doctor_Layout />
                  </DoctorPrivateRoute>
                }
              >
                <Route path="/doctor/dashboard" element={<DoctorAppointments />} />
              </Route>
    
              {/* Catch-all Route */}
              <Route path="*" element={<Missing />} />
            </Routes>
            <Toaster position={"top-right"} />
          </Suspense>
        </Router>
  )
}
export default App
