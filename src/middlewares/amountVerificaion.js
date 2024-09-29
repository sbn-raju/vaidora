const { pool } = require("../database/connect.db.js");

const appointmentAmountVerification = async(req, res, next) =>{
    
}


const classAmountVerification = async(req, res, next)=>{
    const { amount } = req.body;

    console.log(amount);

    const classAmountVerifierQuery = "SELECT class_fees FROM class_master WHERE status = $1 AND isactive IS NULL"
    const classAmountVerifierValue = [0];
    try {
        const classAmountVerifierResult = await pool.query(classAmountVerifierQuery, classAmountVerifierValue)
        console.log(classAmountVerifierResult.rows[0]);
        if(classAmountVerifierResult.rowCount != 0 && parseInt(classAmountVerifierResult.rows[0].class_fees) == parseInt(amount)){
            next();
        }
        else{
            return res.status(402).json({
                success:false,
                message:"The amount paid was incorrect"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:`Error Due to: ${error}`
        })
    } 

}


module.exports = {
    classAmountVerification, appointmentAmountVerification
}