const { Router } = require("express");
const { adminAuthLoginController, adminAuthLogoutController, adminAuthRegistetController, fetchUserDetailsController, verifyAdmin } = require("../controllers/adminAuth.controllers.js");
const { adminAuth } = require("../helpers.js/validator.js");
const { adminAuthentication } = require("../middlewares/authentication.js");

const authAdminRoute = Router();

authAdminRoute.route("/login").post(adminAuthLoginController);
authAdminRoute.route("/register").post(adminAuthRegistetController);
authAdminRoute.route("/logout").post(adminAuthLogoutController);
authAdminRoute.route("/verify").post(adminAuthentication, verifyAdmin);
authAdminRoute.route("/user/details").get(adminAuthentication, fetchUserDetailsController);

module.exports = authAdminRoute;
