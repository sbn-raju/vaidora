const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();


const paymentVerification = async(req,res,next)=>{
   const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
    } = req.body
    try {
        
        const body = razorpay_order_id + "|" + razorpay_payment_id
        const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex")
        if (expectedSignature === razorpay_signature){
            next()
        }
    } catch (error) {
        console.log(error)
        return res.status(403).json({
            success:true,
            message:"The Razorpay Signature is Not matched"
        })
    }
}

module.exports = paymentVerification;
