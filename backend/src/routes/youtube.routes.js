const { Router } = require("express");
const { 
    youtubeLinkCreate, 
    youtubeLinkGet, 
    youtubeLinkDeleteById, 
    youtubeLinkTestimonialsCreate, 
    youtubeLinkTestimonialsDeleteById, 
    youtubeLinkTestimonialsGet, 
    youtubeLinkGetAllVideos, 
    youtubeLinkTestimonialsGetAllVideos 
} = require("../controllers/youtube.controllers.js");
const { adminAuthentication } = require("../middlewares/authentication.js");
const { adminAutho } = require("../middlewares/authorzation.js");



const youtubeLinkRoute = Router();


// Videos For the Home page
youtubeLinkRoute.route("/video").post(adminAuthentication, adminAutho ,youtubeLinkCreate);
youtubeLinkRoute.route("/video").get(youtubeLinkGet);//Public Routes
youtubeLinkRoute.route("/get/videos").get(adminAuthentication, adminAutho, youtubeLinkGetAllVideos);
youtubeLinkRoute.route("/video").delete(adminAuthentication, adminAutho, youtubeLinkDeleteById);



//Testimonials For the Home Pages In the form of video
youtubeLinkRoute.route("/testimonials").post(adminAuthentication, adminAutho, youtubeLinkTestimonialsCreate);
youtubeLinkRoute.route("/testimonials").get(youtubeLinkTestimonialsGet);//Public Routes
youtubeLinkRoute.route("/get/testimonials").get(adminAuthentication, adminAutho, youtubeLinkTestimonialsGetAllVideos);
youtubeLinkRoute.route("/testimonials").delete(adminAuthentication, adminAutho, youtubeLinkTestimonialsDeleteById);


module.exports = youtubeLinkRoute