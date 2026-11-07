const jwt = require("jsonwebtoken");
const { decode } = jwt;
const ErrorHandler = require("../helpers.js/errorHelpers.js");
const { configDotenv } = require("dotenv");
const { decryptToken } = require("../helpers.js/encryptToken.js");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();


const authentication = (req,res,next)=>{
    const authToken = req.cookies.accessToken
    if(!authToken){
        return next(new ErrorHandler(false, "Auth Token is not present" , 403)) 
    }
    try {
        jwt.verify(authToken, process.env.JWT_SECERT_KEY,(err, decoded)=>{
            if(err){
                console.log(err);
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ success: false, message: 'Token has expired' });
                } else {
                    return res.status(401).json({ success: false, message: 'Invalid token' });
                }
            }
            if (!decoded.user) {
                return res.status(401).json({ success: false, message: 'Invalid token: No user data' });
            }
            req.user = decoded.user
            console.log(req.user);
            next();
        })
    } catch (error) {
        return res.status(401).json({ message: `${error}` });
    }
}



const adminAuthentication = async(req,res,next)=>{
    const admin_auth_token = req.cookies.admin_auth_token
    // console.log(admin_auth_token);
    if(!admin_auth_token){
        return next(new ErrorHandler(false, "Auth Token is not present" , 403)) 
    }
    try{
        jwt.verify(admin_auth_token, process.env.JWT_SECERT_KEY,(err, decoded)=>{
            if(err){
                console.log(err)
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ success: false, message: 'Token has expired' });
                } else {
                    return res.status(401).json({ success: false, message: 'Invalid token' });
                }
            }
            if (!decoded.user) {
                return res.status(401).json({ success: false, message: 'Invalid token: No user data' });
            }
            req.user = decoded.user
            // console.log(req.user);  
            next();
        })
    }catch(error){
        console.log(error)
        return res.status(401).json({ message: `${error}`});
    }
}


const doctorAuthentication = (req,res,next)=>{
    const authToken = req.cookies.doctor_auth_token;
    // console.log(authToken);
    if(!authToken){
        return next(new ErrorHandler(false, "Auth Token is not present" , 403)) 
    }
    try {
        jwt.verify(authToken, process.env.JWT_SECERT_KEY,(err, decoded)=>{
            if(err){
                console.log(err);
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ success: false, message: 'Token has expired' });
                } else {
                    return res.status(401).json({ success: false, message: 'Invalid token' });
                }
            }
            if (!decoded.user) {
                return res.status(401).json({ success: false, message: 'Invalid token: No user data' });
            }
            req.user = decoded.user
            next();
        })
    } catch (error) {
        return res.status(401).json({ message: `${error}` });
    }
}







const userAuthentication = async (req,res,next)=>{
    const authToken = req.cookies.accessToken
    if(!authToken){
        return next(new ErrorHandler(false, "Auth Token is not present" , 403)) 
    }
    
    try {
        jwt.verify(authToken, process.env.JWT_SECERT_KEY,(err, decoded)=>{
            if(err){
                console.log(err)
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ success: false, message: 'Token has expired' });
                } else {
                    return res.status(401).json({ success: false, message: 'Invalid token' });
                }
            }
            if (!decoded.user) {
                return res.status(401).json({ success: false, message: 'Invalid token: No user data' });
            }
            req.user = decoded.user
            console.log(req.user);  
            console.log(decoded.user);  
            next();
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: `${error}` });
    }
}







module.exports = {
    authentication,
    userAuthentication,
    adminAuthentication,
    doctorAuthentication
};
