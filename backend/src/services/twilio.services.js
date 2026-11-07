const twilio = require("twilio")
const dotenv =  require("dotenv");
dotenv.config();


const account_sid = process.env.TWILIO_ACCOUNT_SID
const auth_token = process.env.TWILIO_AUTH_TOKEN
const verify_sid = process.env.TWILIO_VERIFY_SERVICE_SID


const authClientWithNumber = twilio(account_sid, auth_token);


module.exports= {
    authClientWithNumber,
    verify_sid
}