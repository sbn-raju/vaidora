// Importing the NPM packages
const express = require("express");
const { urlencoded } = require("express");
const app = require("./config/app.js");
const envConfig = require("./config/dotenv.js");
const { errorMiddleware } = require("./middlewares/error.js");
const { pool } = require("./database/connect.db.js");
const {connection} = require("./database/connect.db.js");
const { default: rateLimit } = require('express-rate-limit')
const { default: helmet, xssFilter } = require('helmet')
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");


//Middlewares 
app.use(express.json());
app.use(urlencoded({extended:true}));

app.use(helmet());

app.use(xssFilter());

app.use(rateLimit({
    windowMs:15*60*1000,
    max:100,
    message:"There are too many requests from the IP"
}))

// app.use(session({
//     name:"session_Id",
//     resave:false,
//     saveUninitialized:false,
//     secret:process.env.SESSION_SECERET_KEY,
//     cookie:{
//         httpOnly:true,
//         sameSite:'strict',
//         maxAge:60*60*1000,
//     }
// }));

app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.get("/",(req,res)=>{
    return res.send("Collasyn Apis Running :) of Dr.Ramchandra & Padma");
}
)



const authRoute = require("./routes/auth.routes.js");
const classRoute = require("./routes/classes.routes.js");
const classUserRoute = require("./routes/classes.user.routes.js");
const youtubeLinkRoute = require("./routes/youtube.routes.js");
const appointmentRoute = require("./routes/appointment.routes.js");
const userAppointmentRoute = require("./routes/appointmnet.user.routes.js");
const authAdminRoute = require("./routes/adminAuth.routes.js");
const doctorRoute = require("./routes/doctorAuth.routes.js");
const paymentRoute = require("./routes/payment.routes.js");
const authUserRoute = require("./routes/profile.user.routes.js");
const messageRoute = require("./routes/messages.routes.js");



//Main routes
app.use("/api/v1/login",authUserRoute)
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/class", classRoute);
app.use("/api/v1/class_booking",classUserRoute);
app.use("/api/v1/orders",paymentRoute)
app.use("/api/v1/youtube",youtubeLinkRoute);
app.use("/api/v1/admin",authAdminRoute);
app.use("/api/v1/doctor",doctorRoute)
app.use("/api/v1/appointment",appointmentRoute);
app.use("/api/v1/admin/message",messageRoute);
app.use("/api/v1/appointment/user",userAppointmentRoute);




app.use(errorMiddleware)


//Database Connection
connection();




//Testing wheather the app is running or not
const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`App is listening at the ${port}`);
});
