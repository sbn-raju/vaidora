import {configureStore} from "@reduxjs/toolkit"
import doctorAuthReducer from "../slices/doctorSlice.js"


const store = configureStore({
    reducer:{
        doctorAuth: doctorAuthReducer,
    }
});

export default store