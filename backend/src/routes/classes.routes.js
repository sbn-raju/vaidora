const { Router } = require("express");
const {
  setClass,
  getClass,
  getClassWithId,
  putClass,
  deleteClass,
  closeBookings,
  terminateClass,
  classLink,
  getUpcomingClass,
  getUpcomingClassDate,
  getBatchMembers,
  getOngoingClass,
  getClassBookingData,
  getCountClassBooking
} = require("../controllers/classes.controllers.js");
const { setClassValidator } = require("../helpers.js/validator.js");
const { adminAuthentication } = require("../middlewares/authentication.js");
const { adminAutho } = require("../middlewares/authorzation.js");



const classRoute = Router()



// Admin Routes
// Create the new Class Route Passing Paramaters
classRoute.route("/admin/setClass").post(adminAuthentication, adminAutho, setClassValidator, setClass) //Correct calling Check

// Close the bookings of the Upcoming Class
classRoute.route("/admin/close-Bookings").post(adminAuthentication, adminAutho, closeBookings)//Correct Calling Check

// Terminating the Ongoing Class
classRoute.route("/admin/terminate-Bookings").post(adminAuthentication, adminAutho, terminateClass)//Correct Calling Check

// Updating the Class link daily for the Ongoing Class
classRoute.route("/admin/class-link").post(adminAuthentication, adminAutho, classLink)//Correct Calling Check

// Read the all classes
classRoute.route("/admin/getClass").get(adminAuthentication, adminAutho, getClass) //Correct calling Check

// Read the class using the id
classRoute.route("/admin/getClass/:id").get(adminAuthentication,adminAutho, getClassWithId) //Correct calling Check

// Read the upcoming classes
classRoute.route("/admin/upcoming-class").get(adminAuthentication, adminAutho, getUpcomingClass) //Correct calling Check

// Read the oncoming classes
classRoute.route("/admin/ongoing-class").get(adminAuthentication, adminAutho, getOngoingClass) //Correct calling Check

// Read the upcoming classes date
classRoute.route("/admin/upcoming-class/date").get(adminAuthentication, adminAutho, getUpcomingClassDate)//Correct calling Check

// Read the members of the particular batch
classRoute.route("/admin/class/batches").get(adminAuthentication, adminAutho, getBatchMembers)//Correct calling Check

// Read the User class booking data
classRoute.route("/admin/users/booked").get(adminAuthentication, adminAutho, getClassBookingData)//Correct calling Check

// Update the Classes using id
classRoute.route("/admin/putClass/:id").put(adminAuthentication, adminAutho, putClass) //Correct calling Check

// Delete the Classes using id
classRoute.route("/admin/deleteClass/:id").delete(adminAuthentication, adminAutho, deleteClass) //Correct calling Check

// Get the Count of the Class Bookigs
classRoute.route("/admin/count/classBooking").get(adminAuthentication, adminAutho, getCountClassBooking);




module.exports = classRoute