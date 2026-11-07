const { pool } = require("../database/connect.db.js");

async function slotCreator(start_time, time_duration, slots_no, id, created_by, updated_by){
    let [slot_start_hours, slot_start_minutes] = start_time.split(":");
    slot_start_hours = parseInt(slot_start_hours, 10); 
    slot_start_minutes = parseInt(slot_start_minutes, 10); 
    let flagCounter = 0;

    for (let i = 0; i < slots_no; i++) {
        let slot_end_minutes = slot_start_minutes + time_duration;
        let slot_end_hours = slot_start_hours;
        
        if (slot_end_minutes >= 60) {
            slot_end_hours += Math.floor(slot_end_minutes / 60);
            slot_end_minutes = slot_end_minutes % 60;
        }

        if(slot_end_hours >= 24){
            slot_end_hours = slot_end_hours % 24
        }
        
        let slot_start_time = setEverthing(slot_start_hours,slot_start_minutes);
        let slot_end_time = setEverthing(slot_end_hours,slot_end_minutes);

        const appointmentSlotMasterQuery = "INSERT INTO appointment_slot_master (appointment_id, slot_start_time, slot_end_time, created_by, updated_by) VALUES ($1, $2, $3, $4, $5) RETURNING *"
        const appointmentSlotMasterValue = [id,slot_start_time, slot_end_time, created_by, updated_by]

        try {
            const appointmentSlotMaster = await pool.query(appointmentSlotMasterQuery, appointmentSlotMasterValue);
            if(appointmentSlotMaster.rowCount!=0){
                flagCounter++
            }
            else{
                return false
            }
         } catch (error) {
            return Promise.reject(error);    
        } 
        slot_start_hours = slot_end_hours;
        slot_start_minutes = slot_end_minutes;       
    }
    if(flagCounter == slots_no){
        return true
    }
    else{
        return false
    }
   
}

function setEverthing(hours, minutes){
    let currentTimestamp = new Date();
    currentTimestamp.setHours(hours);
    currentTimestamp.setMinutes(minutes);
    currentTimestamp.setSeconds(0);
    currentTimestamp.setMilliseconds(0);
    let slot_time = currentTimestamp.toLocaleTimeString()

    return slot_time

}
module.exports = slotCreator;
