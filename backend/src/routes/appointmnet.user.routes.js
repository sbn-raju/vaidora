const { Router } = require("express");
const { bookSlots, getAppointmentDetails } = require("../controllers/appointment.user.controllers.js");
const { appointmentBookingValidator } = require("../helpers.js/validator.js");
const paymentVerification = require("../middlewares/paymentVerification.js");
const { userAuthentication } = require("../middlewares/authentication.js");
const {getAllDoctor} = require("../controllers/doctorAuth.controllers.js");


const userAppointment = Router();


userAppointment.route("/bookSlots").post(userAuthentication, appointmentBookingValidator, paymentVerification, bookSlots);
userAppointment.route("/get-appointment").post(userAuthentication, getAppointmentDetails);
userAppointment.route("/get/doctors").get(userAuthentication, getAllDoctor)


module.exports = userAppointment