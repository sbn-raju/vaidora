const ErrorHandler = require("../helpers.js/errorHelpers.js");
const slotCalculator = require("../helpers.js/slotCalculator.js");
const slotCreator = require("../helpers.js/slotMaker.js");
const { pool } = require("../database/connect.db.js");
const { validationResult } = require("express-validator");



//This controller Generates the Appointment for the particular Doctor and create Slots
const appointmentMasterCreate = async(req,res,next)=>{
    const{admin_id} = req.user;
    try {
        let slots_no = 0
        const{doctor_id, date, start_time, end_time, time_duration} = req.body
        const created_by = admin_id
        const updated_by = admin_id
        if(!(doctor_id || date || start_time || end_time || time_duration || created_by || updated_by)){
            return next (new ErrorHandler(false, "Kindly provide all the required fields.", 302));
        }
        const slot_duration = parseInt(time_duration);
        slots_no = await slotCalculator(start_time, end_time, slot_duration)

        const appointmentMasterCreateQuery = "INSERT INTO appointment_master (doctor_id, date, start_time, end_time, time_duration, slots_no, created_by, updated_by) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *"
        const appointmentMasterCreateValue = [doctor_id, date, start_time, end_time, slot_duration, slots_no, created_by, updated_by]
    
let appointment_id = 0;
        try {
            const appointmentMasterCreateResults = await pool.query(appointmentMasterCreateQuery, appointmentMasterCreateValue);
            if(appointmentMasterCreateResults.rowCount != 0){
                appointment_id = appointmentMasterCreateResults.rows[0].id
                if(await slotCreator(start_time, slot_duration, slots_no, appointment_id, created_by, updated_by)){
                    return res.status(200).json({
                        success:true,
                        message:"Appointment Master has been successfully created.",
                        data:appointmentMasterCreateResults.rows
                    })
                }
            }
        } catch (error) {
            const deleteAppointmentDueToError = await pool.query("DELETE FROM appointment_master WHERE id = $1",[id]);
            return next(new ErrorHandler(false, `Appointment master not created due to ${error.message}`, 409))
        }
    } catch (error) {
        return next(new ErrorHandler(false, `Internal Error Server due to ${error.message}`, 500))
    }
}


//This controller gets the slots on the bases of the date and the doctor
const appointmentSlotMasterGetSlots = async(req,res,next)=>{
    try {
        const { date, doctor_id } = req.body

        const getQuerySlotMaster = "SELECT * FROM appointment_slot_master WHERE appointment_id = (SELECT id FROM appointment_master WHERE date = $1 AND doctor_id = $2 ) AND booked_by_user_id IS NOT NULL"
        const getValueSlotMaster = [date, doctor_id]

        try{
            const getResults = await pool.query(getQuerySlotMaster, getValueSlotMaster)
            if(getResults.rowCount!=0){
                return res.status(200).json({
                    success:true,
                    message:"This is the Fetched Results",
                    data:getResults.rows
                })
            }
            else{
                return res.status(200).json({
                    success:true,
                    message:"Slots are not available."
                })
            }

        }catch(error){
            return next(new ErrorHandler(false, `Error due to the ${error.message}`, 404))
        }

    } catch (error) {
        return next(new ErrorHandler(false, `Internal server error${error.message}`, 500))
    }
}


//This controller returns the slots based on the date of the slot
const appointmentSlotPerDate = async(req,res,next)=>{
    try {
        const { date } = req.body
        let getResults = [];
    
        const getQuerySlotMaster = "SELECT id, doctor_id FROM appointment_master WHERE date = $1"
        const getValueSlotMaster = [date]

        try{
            const getIdOfAppointments = await pool.query(getQuerySlotMaster, getValueSlotMaster)
            getResults = getIdOfAppointments.rows
            let getAppointmentSlotMaster = []
            for(let i = 0; i < getResults.length; i++){
                const appointmentSlotMasterQuery = "SELECT * FROM appointment_slot_master WHERE appointment_id = $1"
                const appointmentSlotMastervalue = [parseInt(getResults[i].id)]
                try {
                    const getAppointment = await pool.query(appointmentSlotMasterQuery,appointmentSlotMastervalue);
                    getAppointmentSlotMaster.push({
                        doctor:getResults[i].doctor_id,
                        slots:getAppointment.rows
                    })
                } catch (error) {
                    return next(new ErrorHandler(false, `Error due to the ${error.message}`, 409))
                }
            }
            return res.status(200).json({
                success:true,
                message:"This is the Fetched Results",
                date:getAppointmentSlotMaster
            })

        }catch(error){
            return next(new ErrorHandler(false, `Error due to the ${error.message}`, 409))
        }

    } catch (error) {
        return next(new ErrorHandler(false, `Internal server error${error.message}`, 500))
    }
}


//This controllers return the empty slots of the doctor
const emptySlots = async(req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            success:false,
            message:errors.array(), 
        })
    }
    const {date, doctor_id} = req.body
    if(!(date || doctor_id)){
        return next(new ErrorHandler(false, "Kindly provide all the required fields", 402))
    }
    const emptySlotsQuery = "SELECT id, slot_start_time FROM appointment_slot_master WHERE appointment_id = (SELECT id FROM appointment_master WHERE date = $1 AND doctor_id = $2) AND booked_by_user_id IS NULL"
    const emptySlotsValues = [date, doctor_id]
    try {
        const emptySlotsResults = await pool.query(emptySlotsQuery, emptySlotsValues);
        if(emptySlotsResults.rowCount!=0){
            return res.status(200).json({
                success:true,
                message:"This are the empty Slots",
                data:emptySlotsResults.rows
            })
        }
        else{
            return next(new ErrorHandler(false, "No slots available for the selected doctor or date.", 402))
        }
    } catch (error) {
        return next(new ErrorHandler(false, `${error}`, 402))

    }
}


//This controller returns the slots which are the user Appointmnets
const getUserAppointments = async(req,res,next)=>{
    const getUserAppointmentsQuery = "SELECT user_appointment_details.id, user_appointment_details.purpose_of_visit, user_appointment_details.date, user_appointment_details.mobile_no, user_appointment_details.p_name,user_appointment_details.doctor_id, user_appointment_details.time_slot, doctor_master.name, appointment_slot_master.slot_start_time FROM user_appointment_details JOIN doctor_master ON user_appointment_details.doctor_id = doctor_master.id JOIN appointment_slot_master ON user_appointment_details.time_slot = appointment_slot_master.id ORDER BY user_appointment_details.created_at DESC"
    try {
        const getUserAppointmentsResults = await pool.query(getUserAppointmentsQuery);
        if(getUserAppointmentsResults.rowCount!=0){
            return res.status(200).json({
                success:true,
                message:"Fetched all the appointments for the user",
                data:getUserAppointmentsResults.rows
            })
        }
        else{
            return next(new ErrorHandler(false, "No User Appointments", 404))
        }
    } catch (error) {
        return next(new ErrorHandler(false, `Internal server error dur to ${error}`, 500))
    }
}


//This controller mark the user as completed
const setCompleteAppointment = async(req,res,next)=>{
    const {id} = req.query
    if(!id){
        return res.status(302).json({
            success:false,
            message:"Please select the user to mark completed"
        })
    }
    const setCompleteAppointmentQuery = "UPDATE user_appointment_details SET iscompleted = $1 WHERE id = $2 RETURNING iscompleted";
    const setCompleteAppointmentValue = [1, id];
    try {
        const setCompleteAppointmentresults = await pool.query(setCompleteAppointmentQuery,setCompleteAppointmentValue);
        if(setCompleteAppointmentresults.rowCount!=0){
        return res.status(200).json({
            success:true,
            message:"Successfully marked as completed"
        })
        }
        else{
            return res.status(302).json({
                success:true,
                message:"Id not found for the user"
            })
        }
    } catch (error) {
        return next(new ErrorHandler(false, `${error}`, 402))
    }


}


//This is controller returns completed appointments
const getCompletedAppointments = async(req,res)=>{
    const completeQuery = "SELECT user_appointment_details.purpose_of_visit, user_appointment_details.date, user_appointment_details.mobile_no ,user_appointment_details.iscompleted, user_appointment_details.p_name,user_appointment_details.doctor_id, user_appointment_details.time_slot, doctor_master.name, appointment_slot_master.slot_start_time FROM user_appointment_details JOIN doctor_master ON user_appointment_details.doctor_id = doctor_master.id JOIN appointment_slot_master ON user_appointment_details.time_slot = appointment_slot_master.id WHERE user_appointment_details.iscompleted = $1 ORDER BY user_appointment_details.created_at DESC"
    const isCompleted = 1;
    const completeValues = [isCompleted];
    try {
        const completedAppointmentRes = await pool.query(completeQuery, completeValues);
    if(completedAppointmentRes.rowCount!=0){
        return res.status(200).json({
            success:true,
            message:"Completed Appointments",
            data:completedAppointmentRes.rows
        })
    }
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`Error Occured : ${error}`,
        })
        
    }
}


//This controller returns the count of the completed appointments
const getCountOfCompletedAppointments = async(req,res)=>{
    const getCountQuery = "SELECT COUNT(*) FROM user_appointment_details WHERE iscompleted = $1"
    const getCountValue = [1];
    try {
        const getCount = await pool.query(getCountQuery, getCountValue);
        if(getCount.rowCount!=0){
            return res.status(200).json({
                success:true,
                data:getCount.rows[0]
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`Error Occured : ${error}`,
        })

    } 
}


//This controller retrun the count of the toatal appointment booked
const getCountOfAppointment = async(req,res)=>{
    const getCountQuery = "SELECT COUNT(*) FROM user_appointment_details WHERE iscompleted IS NUll"
    try {
        const getCount = await pool.query(getCountQuery);
        if(getCount.rowCount!=0){
            return res.status(200).json({
                success:true,
                data:getCount.rows[0]
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`Error Occured : ${error}`,
        })
    } 
}


//This controller return the count of the completed appointment by the particular doctor
const getCountOfAppointmentCompletedByDoctor = async(req,res)=>{
    const {id} = req.user;
    const queryCountOfAppointments = "SELECT COUNT(*) FROM user_appointment_details WHERE iscompleted IS NUll AND doctor_id = $1 "
    const valueCountOfAppointments = [id];

    try {
        const results = await pool.query(queryCountOfAppointments, valueCountOfAppointments);
        if(results.rowCount !=0){
            return res.status(200).json({
                success:true,
                message:"The Count of the Completed Appoinments",
                data:results.rows[0].count
            })
        }
        else{
            return res.status(200).json({
                success:true,
                message:"No Completed Appointments",
            }) 
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:`${error}`
        })
    }
}


//This controller returns the gets the appointment of the particular doctor
const getAppoinmentOfDoctor = async(req,res)=>{
    const {doctor_id} = req.user;
    const getAppoinmentOfDoctorQuery = "SELECT user_appointment_details.id, user_appointment_details.purpose_of_visit, user_appointment_details.date, user_appointment_details.mobile_no, user_appointment_details.p_name,user_appointment_details.doctor_id, user_appointment_details.time_slot, doctor_master.name, appointment_slot_master.slot_start_time FROM user_appointment_details JOIN doctor_master ON user_appointment_details.doctor_id = doctor_master.id JOIN appointment_slot_master ON user_appointment_details.time_slot = appointment_slot_master.id WHERE user_appointment_details.doctor_id = $1 AND user_appointment_details.iscompleted IS NULL ORDER BY user_appointment_details.created_at DESC"
    
    const getAppoinmentOfDoctorValue = [doctor_id]
    try {
        const getAppoinmentOfDoctorResult = await pool.query(getAppoinmentOfDoctorQuery, getAppoinmentOfDoctorValue);
        if(getAppoinmentOfDoctorResult.rowCount!=0){
            return res.status(200).json({
                success:true,
                message:"All Appointments",
                data:getAppoinmentOfDoctorResult.rows
            })
        }
        else{
            return res.status(404).json({
                success:false,
                message:"No Appointments",
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            succes:false,
            message:`Error ${error}`
        })
    }
}


//This controller return the completed appointments by the particular doctor 
const getCompletedAppointmentsOfDoctor = async(req,res)=>{
    const {doctor_id} = req.user;
    const getAppoinmentOfDoctorQuery = "SELECT user_appointment_details.purpose_of_visit, user_appointment_details.date, user_appointment_details.mobile_no, user_appointment_details.p_name,user_appointment_details.doctor_id, user_appointment_details.time_slot, doctor_master.name, appointment_slot_master.slot_start_time FROM user_appointment_details JOIN doctor_master ON user_appointment_details.doctor_id = doctor_master.id JOIN appointment_slot_master ON user_appointment_details.time_slot = appointment_slot_master.id WHERE user_appointment_details.doctor_id = $1 AND iscompleted = $2 ORDER BY user_appointment_details.created_at DESC"
    const getAppoinmentOfDoctorValue = [doctor_id, 1]
    try {
        const getAppoinmentOfDoctorResult = await pool.query(getAppoinmentOfDoctorQuery, getAppoinmentOfDoctorValue);

        if(getAppoinmentOfDoctorResult.rowCount!=0){
            return res.status(200).json({
                success:true,
                message:`All the Appointments`,
                data:getAppoinmentOfDoctorResult.rows
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            succes:false,
            message:`Error ${error}`
        })
    }
}

module.exports = {
    appointmentMasterCreate,
    appointmentSlotMasterGetSlots,
    appointmentSlotPerDate,
    emptySlots,
    getUserAppointments,
    setCompleteAppointment,
    getCompletedAppointments,
    getCountOfCompletedAppointments,
    getCountOfAppointment,
    getCountOfAppointmentCompletedByDoctor,
    getAppoinmentOfDoctor,
    getCompletedAppointmentsOfDoctor
}