const { pool } = require("../database/connect.db.js");
const dotenv = require("dotenv");
dotenv.config();
const ErrorHandler = require("../helpers.js/errorHelpers.js");
const { sendClassConfimMessage } = require("../services/messages.services.js");



dotenv.config()


const currentDate = new Date(Date.now())
const formattedDate = currentDate.toLocaleDateString('en-GB');


const currentTime = new Date(Date.now())



//USER ROUTES
const setClassBooking = async (req, res, next) => {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      formData,
      amount
    } = req.body
    const user = req.user
    const {name, email, whatsapp, city} = {...formData}
    let paymentDetailsId 
    let upcomingClassDetailsId
    let classDate
    let classTime
    try { 
        await pool.query('BEGIN');
        const paymentDetailsQuery = "INSERT INTO user_payment_details (payment_amount, payment_date, payment_time, payment_status, razorpay_order_id, razorpay_payment_id, razorpay_signature) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *"
        const paymentDetailsValues = [amount, formattedDate, currentTime, 1, razorpay_order_id, razorpay_payment_id, razorpay_signature]
        try {
          const paymentDetailsResults = await pool.query(paymentDetailsQuery, paymentDetailsValues);
          paymentDetailsId = paymentDetailsResults.rows[0].id
          const upcomingClassIdQuery = "SELECT id, class_date, class_time FROM class_master WHERE status = $1 and isactive IS NULL" 
          try {
            const upcomingClassIdResults = await pool.query(upcomingClassIdQuery,[0]);
            upcomingClassDetailsId = upcomingClassIdResults.rows[0].id
            classDate = upcomingClassIdResults.rows[0].class_date
            classTime = upcomingClassIdResults.rows[0].class_time
          } catch (error) {
            await pool.query('ROLLBACK');
            return next(new ErrorHandler(false, `${error}` ,400));
          }
        } catch (error) {
          await pool.query('ROLLBACK');
          return next(new ErrorHandler(false, `${error}` ,400));
        }
        const classBookingQuery = "INSERT INTO class_booking (user_id, class_id, name, email, whatsapp_no, city, payment_details) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *"
        const classBookingValues = [user.user_id, upcomingClassDetailsId, name, email, whatsapp,city,paymentDetailsId]
        try {
          const classBookingResults = await pool.query(classBookingQuery, classBookingValues)
          if(classBookingResults.rowCount!=0){
            await pool.query("COMMIT");
            sendClassConfimMessage(
              whatsapp,
              name,
              classDate,
              classTime,
              upcomingClassDetailsId
            )
            return res.status(200).json({
              success:true,
              message:"The Class is Booked",
              data:classBookingResults.rows[0]
            })
          }
        } catch (error) {
          await pool.query('ROLLBACK');
          return next(new ErrorHandler(false, `${error}` ,400));
        }
    } catch (error) {
      await pool.query('ROLLBACK');
      console.log(error)
      return next(new ErrorHandler(false, `${error}` ,400));
    }
}






const getClassesBooked = async(req,res,next)=>{
  const user = req.user
  const getClassesBookedQuery = "SELECT DISTINCT class_booking.class_id, class_master.class_date, class_master.class_time, class_master.class_link, class_master.status, class_master.isactive FROM class_booking JOIN class_master ON class_booking.class_id = class_master.id WHERE class_booking.user_id = $1;"
  try {
    const getClassBookedResults = await pool.query(getClassesBookedQuery, [user.user_id]);
    if(getClassBookedResults.rowCount!=0){
      return res.status(200).json({
        success:true,
        message:"All Class Bookings",
        data:getClassBookedResults.rows
      })
    }
    else{
      return res.status(200).json({
        success:true,
        message:"No Class Bookings",
        data:getClassBookedResults.rows
      })
    }

  } catch (error) {
    console.log(error)
    return next(new ErrorHandler(false, `${error}` ,400));
  }
}

const getClassPrice = async(req,res)=>{
  const getClassPriceQuery = "SELECT class_fees FROM class_master WHERE status = $1 AND isactive IS NULL"
  const getClassPriceValue = [0];

  try {
    const getClassPriceResults = await pool.query(getClassPriceQuery, getClassPriceValue);
    if(getClassPriceResults.rowCount != 0){
      return res.status(200).json({
        success:true,
        message:"This is the amount of the class",
        data:getClassPriceResults.rows[0]
      })
    }
    else{
      return res.status(200).json({
        success:false,
        message:"There is no upcoming Class to book"
      })
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success:false,
      message:`There is the error due to: ${error}`
    })
  }

}
  


  
module.exports={
    setClassBooking,
    getClassesBooked,
    getClassPrice
}