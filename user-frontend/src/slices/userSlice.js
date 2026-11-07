import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { decryptData } from "../utils/encryptData";
import axios from "axios";

export const decryptAndVerify = createAsyncThunk("auth/user", async(_, {isRejectedWithValue})=>{
  
  const token = localStorage.getItem("user_Info");
  const user = localStorage.getItem("user_Role");


  if(token == null || user == null){
    return ({token: null, user: null});
  }

  const decryptedToken = await decryptData(token);
  const decryptedUser = await decryptData(user) ;

  try {
    const response = await axios.post("/api/v1/auth/verify/user");
    console.log(response.data);
    if (response.status == 200 && response.statusText === "OK" && response.data.success) {
      return ({token : decryptedToken, user: decryptedUser});
    }
  } catch (error) {
    console.log(error);
    return ({token: null, user: null});;
  }
})



export const refreshTheAccessToken = createAsyncThunk("/refresh/user", async(_, {isRejectedWithValue})=>{
  try {
    const response = await axios.post("/api/v1/auth/refresh-token");
    console.log(response);
    const token = response?.data.tokens.accessToken;
    const role = response?.data.roles.role; 
    return ({token:token , user:role})
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
})





// decrypting the information
// const decryptTokenAndVerifyToken = async (token) => {
//   const decryptedToken = await decryptData(token);
//   try {
//     const response = await axios.post("/api/v1/auth/verify/user");
//     console.log(response.data);
//     if (response.status == 200) {
//       return decryptedToken;
//     }
//     console.log(decryptedToken);
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

// const decryptRoleAndVerifyRole = async (role) => {
//   if (!role) {
//     return null;
//   }
//   const decryptedRole = await decryptData(role);
//   console.log(decryptedRole);

//   return decryptedRole;
// };


const initialState = {
  token:null,
  user:null,
  loading:true,
  error:false,
}



const authSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user_role;
    },
    logoutUser: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("user_Info");
      localStorage.removeItem("user_Role");
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(decryptAndVerify.pending, (state)=>{
      state.token = null;
      state.user = null;
      state.loading = true;
      state.error = false;
    }).addCase(decryptAndVerify.fulfilled, (state, action)=>{
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.loading = false;
      state.error = false;
    }).addCase(decryptAndVerify.rejected, (state, action)=>{
      state.token = null;
      state.user = null;
      state.loading = false;
      state.error = true;

      localStorage.removeItem("user_Info");
      localStorage.removeItem("user_Role");
    }),
    builder.addCase(refreshTheAccessToken.pending, (state, action)=>{
      state.token = null;
      state.user = null;
      state.loading = true;
      state.error = false;
    })
    .addCase(refreshTheAccessToken.fulfilled, (state, action)=>{
      console.log(action.payload);
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.loading = false;
      state.error = false;
    })
    .addCase(refreshTheAccessToken.rejected, (state, action)=>{
      state.token = null;
      state.user = null;
      state.loading = false;
      state.error = true;
      localStorage.removeItem("user_Info");
      localStorage.removeItem("user_Role");
    })
  }
})


export const { logoutUser, loginUser } = authSlice.actions;

export default authSlice.reducer;
