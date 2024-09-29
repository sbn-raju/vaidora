const { check } = require("express-validator");

const appointmentBookingValidator = [
    check("appointmentData.appointmentFormData.name", "Name is Required").not().isEmpty().isString(),
    check("appointmentData.appointmentFormData.choose_purpose","Purpose of visit is Required").not().isEmpty().isString(),
    check("appointmentData.appointmentFormData.date", "Date is not selected").not().isEmpty().isDate(),
    check("appointmentData.timeSlot", "Time Slot is not selected").not().isEmpty().isNumeric(),
    check("appointmentData.appointmentFormData.phone_no","Phone No. is Required").not().isEmpty().isMobilePhone(),
    check("appointmentData.appointmentFormData.doctor_id","Please select Doctor of your choice").not().isEmpty().isNumeric(),
]


const emptySlotsValidator = [
    check("date","Date is Required").not().isEmpty().isDate(),
    check("doctor_id","Please select Doctor of your choice").not().isEmpty().isNumeric()
]

const setClassValidator = [
    check("class_date", "Date is not selected").not().isEmpty(),
    check("class_time", "Time is not set").not().isEmpty().isTime(),
    check("class_fees", "Fees is not entered").not().isEmpty().isFloat(),
]


const adminAuth = [
    check("username","Username is Required").not().isEmpty().isAlphanumeric().trim(),
    check("password","Password is Required").not().isEmpty().isString()
]


const classBookingValidator = [
    check("name", "Name is Required").not().isEmpty().isString().trim(),
    check("email", "Email is Required").not().isEmpty().isEmail(),
    check("whatsapp", "Whatapp number is Required").not().isEmpty().isMobilePhone(),
]

module.exports = {
    appointmentBookingValidator,
    emptySlotsValidator,
    setClassValidator,
    adminAuth,
    classBookingValidator
};