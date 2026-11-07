const { pool } = require("../database/connect.db.js");
const ErrorHandler = require("../helpers.js/errorHelpers.js");
const { validationResult } = require("express-validator");
const { sendAppointmentConfirmMessage } = require("../services/messages.services.js");


const currentDate = new Date(Date.now())
const formattedDate = currentDate.toLocaleDateString("en-GB")
const currentTime = new Date(Date.now())

const bookSlots = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    })
  }
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    appointmentData,
  } = req.body
  const user = req.user
  const paymentDetailsQuery =
    "INSERT INTO user_payment_details (payment_amount, payment_date, payment_time, payment_status, razorpay_order_id, razorpay_payment_id, razorpay_signature) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *"
  const paymentDetailsValues = [
    500,
    formattedDate,
    currentTime,
    1,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  ]
  await pool.query("COMMIT")
  try {
    const paymentDetailsResults = await pool.query(
      paymentDetailsQuery,
      paymentDetailsValues
    )
    if (paymentDetailsResults.rowCount != 0) {
      const paymentDetailsId = paymentDetailsResults.rows[0].id
      const { name, choose_purpose, date, doctor_id, phone_no } =
        appointmentData.appointmentFormData
      const timeSlot = appointmentData.timeSlot
      const bookSlotsQuery =
        "INSERT INTO user_appointment_details (user_id, purpose_of_visit, date, time_slot, doctor_id, payment_details, mobile_no, p_name) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *"
      const bookSlotsValues = [
        user.user_id,
        choose_purpose,
        date,
        timeSlot,
        doctor_id,
        paymentDetailsId,
        phone_no,
        name,
      ]
      try {
        const bookSlotsResulsts = await pool.query(
          bookSlotsQuery,
          bookSlotsValues
        )
        if (bookSlotsResulsts.rowCount != 0) {
          const fillSlotsUpdate =
            "UPDATE appointment_slot_master SET booked_by_user_id = $1 WHERE id = $2 RETURNING *"
          try {
            const fillSlotsUpdateResults = await pool.query(fillSlotsUpdate, [
              user.user_id,
              timeSlot,
            ])
            if (fillSlotsUpdateResults.rowCount != 0) {
              const slot_start_time = fillSlotsUpdateResults.rows[0].slot_start_time
              const messageVerify = sendAppointmentConfirmMessage(
                phone_no,
                date,
                slot_start_time
              )
              if (messageVerify.status == "accepted") {
                return res.status(200).json({
                  success: true,
                  messgae: "Appointment Booked Successfull",
                })
              }
              return res.status(200).json({
                success: true,
                messgae: "Appointment Booked Successfull",
              })
            }
          } catch (error) {
            await pool.query("ROLLBACK")
            return next(new ErrorHandler(false, `${error}`, 402))
          }
        }
      } catch (error) {
        await pool.query("ROLLBACK")
        return next(new ErrorHandler(false, `${error}`, 402))
      }
    }
  } catch (error) {
    await pool.query("ROLLBACK")
    return next(new ErrorHandler(false, `${error}`, 402))
  }
}




const getAppointmentDetails = async (req, res, next) => {
  const user = req.user
  if (!user.user_id) {
    return next(new ErrorHandler(false, "Please Login", 402))
  }
  const getAppointmentDetailsQuery =
    "SELECT user_appointment_details.date,user_appointment_details.purpose_of_visit, doctor_master.name, appointment_slot_master.slot_start_time FROM user_appointment_details JOIN doctor_master ON user_appointment_details.doctor_id = doctor_master.id JOIN appointment_slot_master ON user_appointment_details.time_slot = appointment_slot_master.id WHERE user_id = $1;"
  try {
    const getAppointmentDetailsResults = await pool.query(
      getAppointmentDetailsQuery,
      [user.user_id]
    )
    if (getAppointmentDetailsResults.rowCount != 0) {
      return res.status(200).json({
        success: true,
        message: "All Appointments",
        data: getAppointmentDetailsResults.rows,
      })
    } else {
      return res.status(200).json({
        success: true,
        message: "No Appointments",
      })
    }
  } catch (error) {
    console.log(error)
    return next(new ErrorHandler(false, `${error}`, 402))
  }
}

module.exports = { bookSlots, getAppointmentDetails }
