const { Router } = require("express");
const { 
  getMessageReminder, 
  removeMessageNotify, 
  sendMessageReminder, 
  sendWhatsAppMessageController 
} = require("../controllers/messages.controllers.js");
const { adminAuthentication, userAuthentication } = require("../middlewares/authentication.js");
const { adminAutho } = require("../middlewares/authorzation.js");





const messageRoute = Router();

messageRoute.route("/setMessage").post(adminAuthentication, adminAutho, sendMessageReminder);
messageRoute.route("/terminateMessage").delete(adminAuthentication,adminAutho, removeMessageNotify)
messageRoute.route("/getMessage").get(userAuthentication, getMessageReminder);
messageRoute.route("/send/Message").post(adminAuthentication,adminAutho, sendWhatsAppMessageController);



module.exports = messageRoute