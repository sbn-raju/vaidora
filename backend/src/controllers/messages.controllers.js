const { pool } = require("../database/connect.db.js");
const { appointmentLinkSender, appointmentAlertMessageSender } = require("../helpers.js/messageSender.js");




//Appointment Aleart Message
const sendMessageReminder = async(req, res)=>{
    const{message} = req.body;
    console.log(message);
    const admin_id = req.user;
    const sendMessageReminderQuery = "INSERT INTO notifications (message_data, created_by, updated_by, created_at) VALUES ($1,$2,$3,NOW()) RETURNING *" 
    const sendMessageReminderValue = [message, admin_id, admin_id];
    try {
        const sendMessageReminderResults = await pool.query(sendMessageReminderQuery, sendMessageReminderValue);
        if(sendMessageReminderResults.rowCount !=0){
            return res.status(200).json({
                success:true,
                message:"The Notification is Sent",
                data:sendMessageReminderResults.rows
            })
        } 
        else{
            return res.status(302).json({
                success:true,
                message:"The Notification is not sent",
            })
        }
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:`${error}`
        })
    }
}


const getMessageReminder = async(req,res)=>{
     const getMessageReminderQuery = "SELECT message_data FROM notifications ORDER BY created_at DESC"
     try {
        const getMessageReminderResults = await pool.query(getMessageReminderQuery);
        if(getMessageReminderResults.rowCount !=0){
            return res.status(200).json({
                success:true,
                data:getMessageReminderResults.rows[0]
            })
        } 
        else{
            return res.status(200).json({
                success:false,
                message:"No latest message"
            })
        }
     } catch (error) {
        return res.status(400).json({
            success:false,
            message:`${error}`
        })
     }
}



const removeMessageNotify = async(req,res)=>{
    const getMessageReminderQuery = "DELETE FROM notifications WHERE created_at = (SELECT created_at FROM notifications ORDER BY created_at DESC LIMIT 1)"
    try {
       const getMessageReminderResults = await pool.query(getMessageReminderQuery);
       if(getMessageReminderResults.rowCount !=0){
           return res.status(200).json({
               success:true,
               message:"Successfully removed the Notification Message"
           })
       } 
       else{
        return res.status(200).json({
            success:true,
            message:"This is the Default message "
        })
       }
    } catch (error) {
       return res.status(400).json({
           success:false,
           message:`${error}`
       })
    }
}


const sendWhatsAppMessageController = async(req,res)=>{
    const {numbers, template_id} = req.body
    if(!template_id){
        return res.status(404).json({
            success:false,
            message:"Select the template to Send Messages"
        })
    }
    if(!numbers){
        return res.status(404).json({
            success:false,
            message:"Select the numbers to Send Messages"
        })
    }

    let data = ""
    try {
        switch(template_id){
            case 1001:
                data = await appointmentAlertMessageSender(numbers);
                console.log(data);
                if(data != "error" && data == "ok"){
                    return res.status(200).json({
                        success:true,
                        message:"All messages sent Successfully"
                    })
                }
                break;
            case 1002:
                data = await appointmentLinkSender(numbers);
                if(data != "error" && data == "ok"){
                    return res.status(200).json({
                        success:true,
                        message:"All messages sent Successfully"
                    })
                }
            case 1003:
                data = await appointmentLinkSender(numbers);
                if(data != "error" && data == "ok"){
                    return res.status(200).json({
                        success:true,
                        message:"All messages sent Successfully"
                    })
                }
            case 1004:
                data = await appointmentLinkSender(numbers);
                if(data != "error" && data == "ok"){
                    return res.status(200).json({
                        success:true,
                        message:"All messages sent Successfully"
                    })
                }
            case 1005:
                data = await appointmentLinkSender(numbers);
                if(data != "error" && data == "ok"){
                    return res.status(200).json({
                        success:true,
                        message:"All messages sent Successfully"
                    })
                }
            default:
                return res.status(203).json({
                    success:false,
                    message:"Invalid Template ID"
                })
        }
        
    } catch (error) {
        console.log(error);
    }

}








module.exports = {
    getMessageReminder,
    sendMessageReminder,
    removeMessageNotify,
    sendWhatsAppMessageController
}