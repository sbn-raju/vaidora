const { pool } = require("../database/connect.db.js");
const ErrorHandler = require("../helpers.js/errorHelpers.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const setDoctor = async(req,res)=>{
    const {name, username, password} = req.body
    const {admin_id} = req.user
    try {

        //checking if any user with same username exists
        const existUser=await pool.query("SELECT * FROM doctor_master WHERE username=$1",[username]);
        if(existUser.rows.length > 0) {
            return res.status(400).json({message: "Doctor already in existance"});
        }


        const created_by = admin_id;
        const updated_by = admin_id;
        //encrypting the password using bcrypt
        const passwordHash=await bcrypt.hash(password, 10);
        //creating the user
        const newUser=await pool.query(
            "INSERT INTO doctor_master (name, username, password, created_at, updated_at, created_by, updated_by) VALUES ($1,$2,$3,NOW(),NOW(),$4, $5) RETURNING *",[name,username,passwordHash,created_by, updated_by]
        );
    
        return res.status(201).json({message:"Doctor succesfully registered"});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: err.message});
    }
}




const loginDoctor = async(req,res)=>{
    try {
        const {username,password}=req.body;
        const result=await pool.query("SELECT * FROM doctor_master WHERE username=$1",[username]);
        if(result.rows.length==0) {
            return res.status(400).json({message:"User doesnt exist"});
        }
        const doctor = result.rows[0];
        console.log(doctor);
        const isMatch = await bcrypt.compare(password,doctor.password);
        if(!isMatch) {
            return res.status(400).json({message:"Invalid credentials"});
        }
        const userData = {
            user:{
                admin_id:doctor.id,
                username,
                role_id:"DoctorAdmin"
            }
        };
        //asigning a token which expires in 1 hour
        const token = jwt.sign(userData,process.env.JWT_SECERT_KEY,{
            expiresIn:"1h"
        });  
        //deleting the user password so that it doesnt gets corrputed
        delete doctor.password;
        
        return res.status(200)
        .cookie("doctor_auth_token", token)
        .json({
            message:"Login succesfully",
            token: token,
            data:[{userRole:"DoctorAdmin"}]
        })
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({error:err.message});
        }
}


const getAllDoctor = async(req,res,next)=>{
    const getAllDoctor = "SELECT id, name FROM doctor_master"
    try {
        const getAllDoctors = await pool.query(getAllDoctor)
        return res.status(200).json({
            success:true,
            message:"All Doctors",
            data:getAllDoctors.rows
        })
    } catch (error) {
        return next(new ErrorHandler(false, `${error}` ,400));
    }
}


const verifyDoctor = async(req,res)=>{
    const{role_id} = req.user;
    if(role_id === 'DoctorAdmin'){
        console.log("Admin");
        return res.status(200).json({
            success:true
        })
    }
}

module.exports = {
    getAllDoctor,
    setDoctor,
    loginDoctor,
    verifyDoctor
}