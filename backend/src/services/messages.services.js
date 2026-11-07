const {authClientWithNumber, verify_sid} = require( "./twilio.services.js")
const { configDotenv } = require( "dotenv");

async function sendAppointmentAlertMessage(to,date,time){ 
    try {
        const message = await authClientWithNumber.messages.create({
            from:process.env.TWILIO_WHATSAPP_MESSAGE_SERVICE_SID,
            to: `whatsapp:+91${to}`,
            contentSid: process.env.TWILIO_APPOINTMENT_ALERT_TEMPLATE,
            contentVariables: JSON.stringify({
                1:`${date}`,
                2:`${time}`,
                3:"https://youtu.be/b_vVeDxrbDo?feature=shared"
            })
        })
        console.log(message)
        return true
    } catch (error) {
        console.error(error)
        return false
    }

}

async function sendOTPMessage(to, otp){
    try {
        const message = await authClientWithNumber.messages.create({
            from:process.env.TWILIO_WHATSAPP_MESSAGE_SERVICE_SID,
            to: `whatsapp:+91${to}`,
            contentSid: process.env.TWILIO_OTP_TEMPLATE,
            contentVariables: JSON.stringify({
                1:`${otp}`,
            })
        })
        console.log(message)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

async function sendAppointmentConfirmMessage(to, date, time){
    try {
        const message = await authClientWithNumber.messages.create({
            from:process.env.TWILIO_WHATSAPP_MESSAGE_SERVICE_SID,
            to: `whatsapp:+91${to}`,
            contentSid: process.env.TWILIO_APPOINTMENT_CONFIRMATION_MESSAGE_TEMPLATE,
            contentVariables: JSON.stringify({
                1:`${date}`,
                2:`${time}`
            })
        })
        console.log(message)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

async function sendClassConfimMessage(to,name,date,time,batchNumber){
    try {
        const message = await authClientWithNumber.messages.create({
            from:process.env.TWILIO_WHATSAPP_MESSAGE_SERVICE_SID,
            to: `whatsapp:+91${to}`,
            contentSid: process.env.TWILIO_WORKSHOP_CONFIRMATION_MESSAGE_TEMPLATE,
            contentVariables: JSON.stringify({
                1:`${name}`,
                2:`${date}`,
                3:`${time}`,
                4:`${batchNumber}`,
            })
        })
        console.log(message)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}


async function sendAppointmentLinkMessage(to,link){ 
    try {
        const message = await authClientWithNumber.messages.create({
            from:process.env.TWILIO_WHATSAPP_MESSAGE_SERVICE_SID,
            to: `whatsapp:+91${to}`,
            contentSid: process.env.TWILIO_APPOINTMENT_LINK_MESSAGE_TEMPLATE,
            contentVariables: JSON.stringify({
                1:`${link}`,
                2:"https://youtu.be/b_vVeDxrbDo?feature=shared"
            })
        })
        console.log(message)
        return true
    } catch (error) {
        console.error(error)
        return false
    }

} 







module.exports = {
    sendAppointmentAlertMessage,
    sendAppointmentConfirmMessage,
    sendAppointmentLinkMessage,
    sendClassConfimMessage,
    sendOTPMessage,
}