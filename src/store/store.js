import {configureStore} from "@reduxjs/toolkit"
import userAuthReducer from "../slices/userSlice.js"




const store = configureStore({
    reducer:{
        auth: userAuthReducer,
    }
});

export default store