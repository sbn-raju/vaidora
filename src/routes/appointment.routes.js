const { Router } = require("express");
const {
    appointmentMasterCreate,
    getCountOfCompletedAppointments,
    getCountOfAppointment,
    setCompleteAppointment,
    getCompletedAppointments,
    appointmentSlotMasterGetSlots,
    appointmentSlotPerDate,
    emptySlots,
    getUserAppointments
} = require("../controllers/appointment.controller.js");
const { emptySlotsValidator } = require("../helpers.js/validator.js");
const {
    authentication,
    adminAuthentication,
    doctorAuthentication
} = require("../middlewares/authentication.js");
const { adminAutho, doctorAuthorization } = require("../middlewares/authorzation.js");


const appointmentRoute = Router()


appointmentRoute.route("/get/slots").post(appointmentSlotMasterGetSlots);//user Auth
appointmentRoute.route("/empty-slots").post(emptySlotsValidator, emptySlots)//user auth


appointmentRoute.route("/get/appointments").get(adminAuthentication, adminAutho, getUserAppointments)//admin auth
appointmentRoute.route("/create/slot").post(adminAuthentication,adminAutho, appointmentMasterCreate);//admin auth
appointmentRoute.route("/get/dateSlots").get(adminAuthentication, adminAutho, appointmentSlotPerDate)//admin auth
appointmentRoute.route("/get-completed").get(adminAuthentication, adminAutho, getCompletedAppointments);//admin auth
appointmentRoute.route("/count/completed").get(adminAuthentication,adminAutho, getCountOfCompletedAppointments)//admin auth
appointmentRoute.route("/count/not/completed").get(adminAuthentication, adminAutho, getCountOfAppointment);//admin auth


appointmentRoute.route("/set-complete").put(doctorAuthentication, doctorAuthorization, setCompleteAppointment);//doctor auth



module.exports =  appointmentRoute