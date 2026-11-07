const { Router } = require("express");
const {
  setClassBooking,
  getClassesBooked,
  getClassPrice,
} = require("../controllers/classes.user.controller.js");
const paymentVerification = require("../middlewares/paymentVerification.js");
const { classBookingValidator } = require("../helpers.js/validator.js");
const { userAuthentication } = require("../middlewares/authentication.js");
const {getUpcomingClassDate} = require("../controllers/classes.controllers.js");
const { classAmountVerification } = require("../middlewares/amountVerificaion.js");



const classUserRoute = Router()



// User Routes
classUserRoute.route("/user/setClass_booking").post(userAuthentication,classAmountVerification, paymentVerification, classBookingValidator, setClassBooking) //Correct calling Check

classUserRoute.route("/user/classes/booked").post(userAuthentication, getClassesBooked) //Correct calling Check

classUserRoute.route("/upcoming/date").get(userAuthentication, getUpcomingClassDate)

classUserRoute.route("/class/price").get(userAuthentication, getClassPrice);




module.exports = classUserRoute
