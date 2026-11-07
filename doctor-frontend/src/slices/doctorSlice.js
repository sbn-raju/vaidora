import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { decryptData } from "../utils/encryptData";
import {isTokenExpired} from "../utils/isTokenExpire.js"


export const decryptDataAndInitialize = createAsyncThunk("/auth/doctor",async()=>{

    const token = sessionStorage.getItem("doctor_info");
    const user = sessionStorage.getItem("user_Role");

    if(token == null || user == null){
        return({token:null, user:null});
    }


    const expiryTime = sessionStorage.getItem("doctor_token_expiry");
    if (isTokenExpired(expiryTime)) {
      sessionStorage.removeItem("admin_info");
      sessionStorage.removeItem("doctor_token_expiry");
      sessionStorage.removeItem("user_Role")
      return ({token:null, user:null});
    } 
    const decryptedToken = await decryptData(token);
  const decryptedUser = await decryptData(user);
  try {
    const response = await axios.post("/api/v1/doctor/verify");
    console.log(response);
    if (
      response.status == 200 &&
      response.statusText === "OK" &&
      response.data.success
    ){
      return ({token: decryptedToken, user:decryptedUser});
    }
    else{
      return({token:null, user:null}); 
    }
  } catch (error) {
    console.log(error);
    return({token:null, user:null});
  }


})


// const encryptAndVerifyToken = async (token) => {
//   if (token == null) {
//     return null;
//   }
//   const decryptedToken = await decryptData(token);
//   const response = await axios.post("/api/v1/doctor/verify");
//   console.log(response);
//   if (
//     response.status == 200 &&
//     response.statusText === "OK" &&
//     response.data.success
//   ) {
//     return decryptedToken;
//   } else if (
//     response.status == 403 ||
//     response.statusText === "Forbidden" ||
//     response.data.success ||
//     response.status == 500 ||
//     response.status == 404 ||
//     response.status == 401
//   ) {
//     return null;
//   } else if (
//     response.status === 429 ||
//     response.statusText === "Too Many Requests"
//   ) {
//     return null;
//   } else {
//     return null;
//   }
// };

// const decryptedAndVerifyUser = async (userRole) => {
//   if (userRole == null) {
//     return null;
//   }
//   const decryptedUser = await decryptData(userRole);
//   return decryptedUser;
// };

const initialState = {
  token:null,
  user:null,
  loading:true,
  error:false,
};



const doctorAuth = createSlice({
  name: "DoctorAuth",
  initialState,
  reducers: {
    loginDoctor: (state, action) => {
      const currentTime = new Date().getTime();
      const expiryTime = currentTime + 5 * 60 * 1000;
      sessionStorage.setItem("doctor_token_expiry", expiryTime);

      console.log(action.payload);
      state.token = action.payload.token;
      state.user = action.payload.data[0].userRole;
    },
    logoutDoctor: (state, action) => {
      console.log("Hello");
      console.log(action.payload);
      state.token = null;
      state.user = null;

      sessionStorage.removeItem("doctor_info");
      sessionStorage.removeItem("user_Role");
      sessionStorage.removeItem("doctor_token_expiry");
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(decryptDataAndInitialize.pending, (state, action)=>{
      console.log(action.payload);
      state.token = null;
      state.user = null;
      state.loading = true;
      state.error = false;
    })
    .addCase(decryptDataAndInitialize.fulfilled, (state, action)=>{
      console.log(action.payload)
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.loading = false;
      state.error = false;
    })
    .addCase(decryptDataAndInitialize.rejected, (state,action)=>{
      console.log(action)
      state.token = null;
      state.user = null;
      state.loading = false;
      state.error = true;
    })
    }
});

export const { loginDoctor, logoutDoctor } = doctorAuth.actions;

export default doctorAuth.reducer;
