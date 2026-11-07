const { authentication, userAuthentication } = require("../middlewares/authentication.js");
const { Router } = require("express");
const {autoLoginUser, userProfileDetails, userProfileUpdate} = require("../controllers/profile.user.controllers.js");


const authUserRoute = Router();

authUserRoute.route("/autoLogin").post(autoLoginUser);


authUserRoute.route("/update/details").put(userAuthentication, userProfileUpdate);
authUserRoute.route("/get/details").get(userAuthentication, userProfileDetails);


module.exports = authUserRoute