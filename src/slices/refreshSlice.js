import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


const refreshUserToken = createAsyncThunk("refreshToken", async(_,{rejectWithValue})=>{
    try {
        const response = await axios.post("/api/v1/auth/refresh-token")
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error);
        if(error.response.status === 401){
            window.location.href = '/'
        }
        return rejectWithValue(error.response.data);
    }
})



const initialState = {
    token: null,
    message: ""
};

const refreshSlice = createSlice({
    name: "refreshToken",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder
        .addCase(refreshUserToken.pending, (state) => {
        state.token = null;
        state.message = "";
        })
        .addCase(refreshUserToken.fulfilled, (state, action) => {
        state.token = action.payload.tokens.accessToken.encryptedData;
        console.log(action.payload.tokens);
        state.message = action.payload.message;
        localStorage.setItem("a_tk", action.payload.tokens.accessToken.encryptedData);
        })
        .addCase(refreshUserToken.rejected, (state, action) => {
        state.token = null;
        state.message = action.payload || action.error.message;
        localStorage.removeItem("a_tk") // Use action.payload for error message
        });
    }
});


export {refreshUserToken}

export default refreshSlice.reducer;