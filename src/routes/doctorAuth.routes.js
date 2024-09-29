const { Router } = require("express");
const {
  getAllDoctor,
  setDoctor,
  loginDoctor,
  verifyDoctor
} = require("../controllers/doctorAuth.controllers.js");
const { adminAuthentication, doctorAuthentication, userAuthentication } = require("../middlewares/authentication.js");
const { adminAutho } = require("../middlewares/authorzation.js");
const {
  getAppoinmentOfDoctor,
  getCompletedAppointmentsOfDoctor,
  getCountOfAppointmentCompletedByDoctor
} = require("../controllers/appointment.controller.js");
const {doctorAuthorization} = require("../middlewares/authorzation.js");



const doctorRoute = Router()



// Admin Routes
doctorRoute.route("/get-doctors").get(adminAuthentication, adminAutho, getAllDoctor) //Correct calling Check
doctorRoute.route("/set-doctors").post(adminAuthentication, adminAutho, setDoctor)


//Doctor Login Routes
doctorRoute.route("/auth/login").post(loginDoctor);
doctorRoute.route("/verify").post(doctorAuthentication, verifyDoctor);
doctorRoute.route("/count/completed").get(doctorAuthentication, doctorAuthorization, getCountOfAppointmentCompletedByDoctor);
doctorRoute.route("/get/appointment").get(doctorAuthentication, doctorAuthorization, getAppoinmentOfDoctor)
doctorRoute.route("/get/completed/appointments").get(doctorAuthentication, doctorAuthorization, getCompletedAppointmentsOfDoctor);


//User Routes
doctorRoute.route("/get/doctors").get(userAuthentication, getAllDoctor);








module.exports = doctorRoute
