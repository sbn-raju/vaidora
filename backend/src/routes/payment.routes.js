const { Router } = require("express");
const { 
  paymentController, 
  getPaymentsDetailsForUser, 
  getPayments 
} = require("../controllers/payment.controllers.js");
const { userAuthentication } = require("../middlewares/authentication.js");



const paymentRoute = Router();


paymentRoute.route("/payment").post(paymentController);

paymentRoute.route("/user-payments").post(userAuthentication, getPaymentsDetailsForUser);

paymentRoute.route("/admin/payments").get(getPayments);



module.exports = paymentRoute