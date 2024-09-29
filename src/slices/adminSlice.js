import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { decryptData } from "../utils/encryptData.js";
import { isTokenExpired } from "../utils/isTokenExpire";


export const decryptTheDataAndInitilse = createAsyncThunk("/auth/admin",async()=>{
  const token = sessionStorage.getItem("admin_info");
  const admin = sessionStorage.getItem("user_Role")

  if(token == null || admin == null){
    return ({token:null, admin:null});
  }

  const expiryTime = sessionStorage.getItem("admin_token_expiry");
  if (isTokenExpired(expiryTime)) {
    sessionStorage.removeItem("admin_info");
    sessionStorage.removeItem("admin_token_expiry");
    sessionStorage.removeItem("user_Role")
    return ({token:null, admin:null});
  }

  const decryptedToken = await decryptData(token);
  const decryptedUser = await decryptData(admin);
  try {
    const response = await axios.post("/api/v1/admin/verify");
    console.log(response);
    if (
      response.status == 200 &&
      response.statusText === "OK" &&
      response.data.success
    ){
      return ({token: decryptedToken, admin:decryptedUser});
    }
    else{
      return({token:null, admin:null}); 
    }
  } catch (error) {
    console.log(error);
    return({token:null, admin:null});
  }

})

// const decryptTokenAndVerifyToken = async (token) => {
//   if (token == null) {
//     return null;
//   }

//   const expiryTime = sessionStorage.getItem("admin_token_expiry");
//   if (isTokenExpired(expiryTime)) {
//     sessionStorage.removeItem("admin_info");
//     sessionStorage.removeItem("admin_token_expiry");
//     sessionStorage.removeItem("user_Role")
//     return null;
//   }

//   const decryptedToken = await decryptData(token);
//   try {
//     const response = await axios.post("/api/v1/admin/verify");
//     console.log(response);
//     if (
//       response.status == 200 &&
//       response.statusText === "OK" &&
//       response.data.success
//     )
//       return decryptedToken;
//   } catch (error) {
//     console.log(error);
//     logoutAdmin();
//     return null;
//   }
// };

// const decryptUserAndVerifyUser = async (userRole) => {
//   if (userRole == null) {
//     return null;
//   }
//   const decryptedUser = await decryptData(userRole);
//   return decryptedUser;
// };


const initialState = {
  token:null,
  admin: null,
  loading: true,
  error: false,
};


console.log(initialState);


const adminAuth = createSlice({
  name: "AdminAuth",
  initialState,
  reducers: {
    loginAdmin: (state, action) => {
      const currentTime = new Date().getTime();
      const expiryTime = currentTime + 5 * 60 * 1000;
      sessionStorage.setItem("admin_token_expiry", expiryTime);

      console.log(action.payload);
      state.token = action.payload.token;
      state.admin = action.payload.data[0].userRole;
    },
    logoutAdmin: (state, action) => {
      state.token = null;
      state.admin = null;
      sessionStorage.removeItem("admin_Info");
      sessionStorage.removeItem("user_Role");
      sessionStorage.removeItem("admin_token_expiry");
    },
  },
  extraReducers:(builder)=>{
  builder.addCase(decryptTheDataAndInitilse.pending, (state, action)=>{
    console.log(action.payload);
    state.token = null;
    state.admin = null;
    state.loading = true;
    state.error = false;
  })
  .addCase(decryptTheDataAndInitilse.fulfilled, (state, action)=>{
    console.log(action.payload)
    state.token = action.payload.token;
    state.admin = action.payload.admin;
    state.loading = false;
    state.error = false;
  })
  .addCase(decryptTheDataAndInitilse.rejected, (state,action)=>{
    console.log(action.payload);
    state.token = null;
    state.admin = null;
    state.loading = false;
    state.error = true;
  })
  }
});




export const { loginAdmin, logoutAdmin } = adminAuth.actions;

export default adminAuth.reducer;
