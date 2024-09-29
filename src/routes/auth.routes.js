const { Router } = require("express");
const {
    verifyOneTimePasswordRegisterController,
    sendOneTimePasswordRegisterController,
    userLogoutController,
    refreshAccessToken,
    verifyUser
} = require("../controllers/auth.controller.js");
const { userAuthentication } = require("../middlewares/authentication.js");



const authRoute = Router();



authRoute.route("/register/verify-Details/otp").post(sendOneTimePasswordRegisterController);

authRoute.route("/register/verify-Details/verify").post(verifyOneTimePasswordRegisterController);

authRoute.route("/logout").post(userAuthentication, userLogoutController);

authRoute.route("/refresh-token").post(refreshAccessToken);

authRoute.route("/verify/user").post(userAuthentication, verifyUser);


module.exports = authRoute