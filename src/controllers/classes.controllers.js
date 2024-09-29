const { pool } = require("../database/connect.db.js");
const ErrorHandler = require("../helpers.js/errorHelpers.js");
const { body, param, validationResult } = require("express-validator");
const dotenv = require("dotenv");
dotenv.config();
const currentTimeStamp = new Date(Date.now());



// If Status of the class is 0 then it is open for the booking 
// Admin must close the booking to updated the class_link in the database and to add new Class
// We will update the class isactvive to 0 before adding link and creating new class and while updating closing the bookings 
// If isActive of the class is 1 then the class is terminated
// If isActive of the class is 0 then the class is ongoing 




//Creating the class using the details given by the admin with isActive to null and status to 0
const setClass = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({
      succes:true,
      message:"Input Validation failed",
      data:errors.array()
    })
  }
  // Fetching the previous class to check wheather the class is closed
  // or not if class is not present then create the first class
  const fetchPreviousClass = "SELECT status FROM class_master ORDER BY created_at DESC LIMIT $1"
  try {
    const fetchPreviousClassResults = await pool.query(fetchPreviousClass,[1]);
    if(fetchPreviousClassResults.rowCount != 0){
      if(fetchPreviousClassResults.rows[0].status != 1){
        return res.status(400).json({
          success:true,
          message:"Please Close the Previous Class Bookings",
        })
      }
    }
  } catch (error) {
    return next(new ErrorHandler(false, `Could not fetch the previous Class due to ${error}` ,400))
  }

  const {class_date,class_time, class_fees, created_at, updated_at} = req.body;
  const{admin_id} = req.user;
  const created_by = admin_id;
  const updated_by = admin_id;

  if(!(class_date || class_time || class_fees || created_at || created_by || updated_at || updated_by)){
    return next(new ErrorHandler(false, "Provide all the Input Fields" ,400));
  }
  const timeStamp = new Date();
  const currentStatusOfClass = 0;

  const setClassQuery = "INSERT INTO class_master (class_date,class_time, class_fees, status, created_at, created_by, updated_at, updated_by) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *";
  const setClassValues = [class_date,class_time, class_fees, currentStatusOfClass, timeStamp, created_by, timeStamp, updated_by];

  try {
    const setClassResult = await pool.query(setClassQuery, setClassValues);
    if(setClassResult.rowCount!=0){
      return res.status(201).json({
        success:true,
        message:"DataBase Created",
        data:setClassResult.rows[0]
      })
    }
    else{
      return next(new ErrorHandler(false, "Class Not created" ,400));
    }

  } catch (error) {
    return next(new ErrorHandler(false, `${error}` ,400));
  }
}




//Closing the bookings of the class and updating the isActive status to Zero
const closeBookings = async(req,res,next)=>{
  const checkingTerminationQuery = "SELECT status, isactive FROM class_master ORDER BY created_at DESC LIMIT $1"
  try {
    const checkingTerminationResults = await pool.query(checkingTerminationQuery,[2]);
    if(checkingTerminationResults.rowCount == 2){
       if(checkingTerminationResults.rows[1].isactive != 1){
        return next(new ErrorHandler(false, "Please Terminate the last class" ,400));
      }
    }
    } catch (error) {
      return next(new ErrorHandler(false, `error:${error}` ,400));
    }
  const newStatusOfClass = 1
  const limit = 1
  const newIsActiveStatus = 0


  const closeBookingsQuery = "UPDATE class_master SET status = $1, isactive = $2, updated_at = $3 WHERE id = (SELECT id FROM class_master ORDER BY created_at DESC LIMIT $4)"
  const closeBookingsValue = [newStatusOfClass, newIsActiveStatus, currentTimeStamp, limit];
  try {
    const closeBookingsResults = await pool.query(closeBookingsQuery, closeBookingsValue);
    if(closeBookingsResults.rowCount!=0){
      return res.status(200).json({
        success:true,
        message:"This Last class closed for bookings and is Active now"
      })
    }
  } catch (error) {
    return next(new ErrorHandler(false, `${error}` ,400));
  }
}




//Terminiting the Class to update the link for the new batch
const terminateClass = async(req,res,next)=>{
  const checkingClassStatusQuery = `
  SELECT id, status, isactive 
  FROM class_master 
  ORDER BY created_at DESC 
  LIMIT $1
`;

try {
  const checkingClassStatusResults = await pool.query(checkingClassStatusQuery, [2]);

  const handleTermination = async (classRow) => {
    if (classRow.isactive != 1 && classRow.status == 1) {
      const terminateClassQuery = `
        UPDATE class_master 
        SET isactive = $1 , updated_at = $2
        WHERE id = $3
      `;
      const terminateClassValues = [1, currentTimeStamp, classRow.id];

      try {
        const terminateClassResults = await pool.query(terminateClassQuery, terminateClassValues);
        if (terminateClassResults.rowCount != 0) {
          return res.status(200).json({
            success: true,
            message: "The Class is terminated Successfully",
          });
        }
      } catch (error) {
        return next(new ErrorHandler(false, `Error in Terminating: ${error}`, 400));
      }
    } else {
      return res.status(422).json({
        success: false,
        message: "The class has not been created, or the booking process is still open and not yet closed.",
      });
    }
  };

  if (checkingClassStatusResults.rowCount == 2) {
    await handleTermination(checkingClassStatusResults.rows[1]);
  } else if (checkingClassStatusResults.rowCount == 1) {
    await handleTermination(checkingClassStatusResults.rows[0]);
  }
} catch (error) {
  return next(new ErrorHandler(false, `Error in Fetching Latest Class: ${error}`, 400));
}
}




const classLink = async(req,res,next)=>{
    const {link} = req.body
    if(!link){
      return next(new ErrorHandler(false, "Link is not passed" ,400));
    }
    const mustStatus = 1 
    const mustIsActive = 0
    const classLinkQuery = "UPDATE class_master SET class_link = $1 WHERE status = $2 AND isactive = $3"
    const classLinkValues = [link, mustStatus, mustIsActive];
    try {
      const classLinkResult = await pool.query(classLinkQuery, classLinkValues);
      if(classLinkResult.rowCount != 0){
         return res.status(201).json({
          success:true,
          message:"Link Updated Successfully"
        })
      }
    } catch (error) {
      return next(new ErrorHandler(false, `${error}` ,400));
    }
}




const getOngoingClass = async(req,res,next)=>{
  const getOngoingClassQuery = "SELECT * FROM class_master WHERE status = $1 AND isactive = $2 "
  try {
    const getOngoingClassResults = await pool.query(getOngoingClassQuery, [1,0]);
    if(getOngoingClassResults.rowCount != 0){
      return res.status(200).json({
        success:true,
        message:"Data of the Ongoing Class",
        data:getOngoingClassResults.rows[0]
      })
    }
    else{
      return res.status(200).json({
        success:true,
        message:"No Ongoing Classes Found",
      })
    }
  } catch (error) {
    return next(new ErrorHandler(false, `${error}` ,400));
  }
}




const getUpcomingClass = async(req,res,next)=>{
  const getUpcomingClassQuery = "SELECT * FROM class_master WHERE status = $1 AND isactive IS NULL"
  try {
    const getUpcomingClassResults = await pool.query(getUpcomingClassQuery, [0]);
    if(getUpcomingClassResults.rowCount != 0){
      return res.status(200).json({
        success:true,
        message:"Data of the Upcoming Class",
        data:getUpcomingClassResults.rows[0]
      })
    }
    else{
      return res.status(200).json({
        success:true,
        message:"No Upcoming Classes Found",
        data:getUpcomingClassResults.rows
      })
    }
  } catch (error) {
    return next(new ErrorHandler(false, `${error}` ,400));
  }
} 


const getUpcomingClassDate = async(req,res,next)=>{
  const getUpcomingClassQuery = "SELECT class_date FROM class_master WHERE status = $1 AND isactive IS NULL"
  try {
    const getUpcomingClassResults = await pool.query(getUpcomingClassQuery, [0]);
    if(getUpcomingClassResults.rowCount != 0){
      return res.status(200).json({
        success:true,
        message:"Date of the Upcoming Class",
        data:getUpcomingClassResults.rows[0]
      })
    }
    else{
      return res.status(200).json({
        success:true,
        message:"No Upcoming Classes Found",
        data:getUpcomingClassResults.rows
      })
    }
  } catch (error) {
    return next(new ErrorHandler(false, `${error}` ,400));
  }
}


const getBatchMembers = async(req,res,next)=>{
  const {batch} = req.query
  const getBatchMembersQuery = "SELECT * FROM class_booking WHERE class_id = $1"
  try {
    const getBatchMembersResults = await pool.query(
      getBatchMembersQuery,
      [batch]
    )
    if (getBatchMembersResults.rowCount != 0) {
      return res.status(200).json({
        success: true,
        message: "All the Class Data",
        data: getBatchMembersResults.rows,
      })
    } else {
      return res.status(200).json({
        success: true,
        message: "Data is not Found",
      })
    }
  } catch (error) {
    return next(new ErrorHandler(false, `${error}`, 400))
  }
}


//Getting all the Previous Classes
const getClass = async (req, res) => {
  const getClassQuery = "SELECT id FROM class_master ORDER BY created_by DESC"
  try {
    const getAllClasses = await pool.query(getClassQuery)
    return res.status(200).json({
      success: true,
      message: "All the Classes Data",
      data: getAllClasses.rows,
    })
  } catch (error) {
    return next(new ErrorHandler(error, 400))
  }
}




//getting class by Id
const getClassWithId = async (req, res) => {
  const { id } = req.params
  const getClassWithIdQuery = "SELECT * FROM class_master WHERE id = $1"
  const getClassWithIdValues = [id]
  try {
    const getClassById = await pool.query(
      getClassWithIdQuery,
      getClassWithIdValues
    )
    if (getClassById.rowCount != 0) {
      return res.status(200).json({
        success: true,
        data: getClassById.rows,
        message: "All the Class Data",
      })
    } else {
      return res.status(200).json({
        success: true,
        message: "Id Not Found",
      })
    }
  } catch (error) {
    return next(new ErrorHandler(error, 400))
  }
}




//Updating the class based on the details given by the admin
const putClass = async (req, res, next) => {
  const validationRules = [
    body("class_date", "Date should be Provided").isDate().notEmpty(),
    body("class_time", "Time should be provided").notEmpty(),
    body("class_fees", "Pleas give money").isFloat().notEmpty(),
    body("updated_by").isInt().notEmpty().withMessage("Admin please"),
    body("created_by").isInt().notEmpty().withMessage("Nothing"),
  ]
  await Promise.all(validationRules.map((validate) => validate.run(req)))

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log(errors.array())
    return next(new ErrorHandler(errors.array(), 400))
  }
  const { id } = req.params
  const { class_date, class_time, class_fees, updated_by, created_by } =
    req.body
  const putClassQuery =
    "UPDATE class_master SET class_date=$1, class_time=$2, class_fees=$3, updated_by=$4, created_by=$5 WHERE id=$6"
  const putClassValues = [
    class_date,
    class_time,
    class_fees,
    updated_by,
    created_by,
    id,
  ]
  try {
    const updateClass = await pool.query(putClassQuery, putClassValues)
    if (updateClass.rowCount != 0) {
      return res.status(200).json({
        success: true,
        data: updateClass.rows,
        message: "This is the updated Class",
      })
    } else {
      return res.status(200).json({
        success: true,
        message: "Id not found",
      })
    }
  } catch (error) {
    return next(new ErrorHandler(error, 400))
  }
}




//Deleteing the class by the Id
const deleteClass = async (req, res, next) => {
  const { id } = req.params
  const deleteClassQuery = "DELETE FROM class_master WHERE id = $1"
  const deleteClassValue = [id]
  try {
    const deleteClass = await pool.query(deleteClassQuery, deleteClassValue)
    if (deleteClass.rowCount != 0) {
      return res.status(200).json({
        success: true,
        data: deleteClass,
        message: "This is the delete classs Route",
      })
    } else {
      return res.status(200).json({
        success: true,
        message: "Id not found",
      })
    }
  } catch (error) {
    return next(new ErrorHandler(error, 400))
  }
}


const getClassBookingData = async (req,res,next) => {
  const {limit, skip} = req.query
  console.log(limit, skip)
   const getClassBookingQuery = "SELECT name, whatsapp_no, city, email, class_id FROM class_booking ORDER BY created_at DESC LIMIT $1 OFFSET $2"
   try {
      const getclassBookingResults = await pool.query(getClassBookingQuery, [limit, skip]);
      if(getclassBookingResults.rowCount!=0){
        console.log(getclassBookingResults.rows)
        return res.status(200).json({
          success:true,
          message:"User booking Class",
          data:getclassBookingResults.rows
        })
      }
      else {
        return res.status(302).json({
          success: true,
          message: "Id not found",
        })
      }
   } catch (error) {
    return next(new ErrorHandler(false, `${error}`, 400))
   } 
}



const getCountClassBooking = async (req,res)=>{
   const getCountClassQuery = "SELECT COUNT(*) FROM class_booking"
  try{
    const getCountClass = await pool.query(getCountClassQuery);
    return res.status(200).json({
      success:true,
      data:getCountClass.rows
    })
  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:`Error Occured : ${error}`,
  })
  }
}



module.exports = {
  setClass,
  closeBookings,
  terminateClass,
  classLink,
  getClass,
  getOngoingClass,
  getUpcomingClass,
  getUpcomingClassDate,
  getBatchMembers,
  getClassWithId,
  getClassBookingData,
  putClass,
  deleteClass,
  getCountClassBooking,
}