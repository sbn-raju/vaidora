const { pool } = require("../database/connect.db.js");
;

const autoLoginUser = (req, res) => {
  const userPreviousToken = req.cookies?.accessToken
  if (!userPreviousToken || userPreviousToken === null) {
    return res.status(401).json({
      success: false,
      message: "User Needs To Login",
    })
  } else {
    return res.status(200)
  }
}

const userProfileUpdate = async (req, res) => {
  const { name, email, gender, age, city } = req.body
  const {user_id, mobile_no} = req.user

  if (!(user_id || name || mobile_no || email || gender || age || city)) {
    return res.status(302).json({
      success: false,
      message:"Fill All Details to Submit the Form and get the Membership Card",
    })
  }
  const findTheUserQuery =
    "SELECT user_id FROM user_details WHERE user_id = $1"
  const findTheUserValue = [user_id]
  try {
    const foundUser = await pool.query(findTheUserQuery, findTheUserValue)
    // console.log(foundUser);
    if (foundUser.rowCount == 0) {
      const userProfileUpdateQuery =
        "INSERT INTO user_details (name, mobile_no, email, gender, age, city, user_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING * "

      const userProfileUpdateValue = [
        name,
        mobile_no,
        email,
        gender,
        age,
        city,
        user_id,
      ]
      try {
        const result = await pool.query(
          userProfileUpdateQuery,
          userProfileUpdateValue
        )
        // console.log(result.rows)
        if (result.rowCount != 0) {
          return res.status(200).json({
            success: true,
            message: "Details Updated Successfully",
          })
        }
      } catch (error) {
        return res.status(400).json({
          success: true,
          message: `${error}`,
        })
      }
    } else {
        const userProfileUpdateQuery =
        "UPDATE user_details SET name = $1, mobile_no=$2, email=$3, gender=$4, age=$5, city=$6 WHERE user_id = $7 RETURNING *"

      const userProfileUpdateValue = [
        name,
        mobile_no,
        email,
        gender,
        age,
        city,
        user_id,
      ]
      try {
        const result = await pool.query(
          userProfileUpdateQuery,
          userProfileUpdateValue
        )
        // console.log(result.rows)
        if (result.rowCount != 0) {
          return res.status(200).json({
            success: true,
            message: "Details Updated Successfully",
          })
        }
      } catch (error) {
        return res.status(400).json({
          success: true,
          message: `${error}`,
        })
      }
    }
  } catch (error) {
    return res.status(400).json({
        success: true,
        message: `${error}`,
      })
  }
}

const userProfileDetails = async(req,res)=>{
  const {user_id, mobile_no} = req.user
  const userDetailsQuery = "SELECT * FROM user_details WHERE user_id = $1 AND mobile_no = $2"
  const userDetailsValue = [user_id, mobile_no];
  try {
    const userDetails = await pool.query(userDetailsQuery, userDetailsValue);
    console.log(userDetails);
    if(userDetails.rowCount != 0){
      return res.status(200).json({
        success:true,
        data:userDetails.rows[0]
      })
    }
    else{
      return res.status(404).json({
        success:false,
        messgae:"Please fill this details"
      }) 
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success:false,
      message:`Error occured at ${error}`
    })
  }
}

module.exports = { autoLoginUser, userProfileUpdate, userProfileDetails }
