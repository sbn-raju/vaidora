import {configureStore} from "@reduxjs/toolkit"
import adminAuthReducer from "../slices/adminSlice.js";


const store = configureStore({
    reducer:{
        adminAuth: adminAuthReducer,
    }
});

export default store