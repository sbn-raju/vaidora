const { pool } = require("../database/connect.db.js")
const { encryptToken } = require("../helpers.js/encryptToken.js")
const ErrorHandler = require("../helpers.js/errorHelpers.js")
const { sendOTPMessage } = require("../services/messages.services.js")
const jwt = require("jsonwebtoken")
const currentTimeStamp = new Date()

const options = {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
}

const generateAccessToken = (user) => {
  const accessToken = jwt.sign(
    user,
    process.env.JWT_SECERT_KEY,
    { expiresIn: "1h" },
    options
  )
  return accessToken
}

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    user,
    process.env.JWT_SECERT_KEY,
    { expiresIn: "1d" },
    options
  )
  return refreshToken
}

const generateAccessAndRefreshTokens = async (userData) => {
  try {
    const findUserById = "SELECT * FROM user_registration WHERE id = $1"
    const findUserByIdRes = await pool.query(findUserById, [
      parseInt(userData.user.user_id),
    ])
    const user = findUserByIdRes.rows[0]
    // console.log(user)
    const accessToken = generateAccessToken(userData)
    const refreshToken = generateRefreshToken(userData)
    const updateRefreshToken =
      "UPDATE user_registration SET refresh_token = $1 WHERE id = $2"
    try {
      const updateRefreshTokenResult = await pool.query(updateRefreshToken, [
        refreshToken,
        user.id,
      ])
      if (updateRefreshTokenResult.rowCount != 0) {
        console.log(accessToken)
        return { accessToken, refreshToken }
      }
    } catch (error) {
      console.log(error)
      return error
    }
  } catch (error) {
    console.log(error)
    return error
  }
}

const generateOtp = async () => {
  return Math.floor(100000 + Math.random() * 900000)
}

const sendOneTimePasswordRegisterController = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body
    console.log(phoneNumber)
    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        error: "Phone number is required",
      })
    }
    const lastDigits = phoneNumber.slice(6, 10)
    const generatedOtp = await generateOtp()
    const otpNotVerified = 0
    const verifyUserQuery =
      "SELECT * FROM user_registration WHERE mobile_no = $1"
    const verifyUserValues = [phoneNumber]
    try {
      const verifyUserResults = await pool.query(
        verifyUserQuery,
        verifyUserValues
      )
      if (verifyUserResults.rowCount != 0) {
        const expireTime = new Date(
          await new Date(currentTimeStamp.getTime() + 10 * 60 * 1000)
        )
          .toTimeString()
          .split(" ")[0]
        const setOTPQuery =
          "UPDATE user_registration SET generated_otp = $1, otp_verification = $2, isotpexpiry = $3 WHERE mobile_no = $4"
        const setOTPValues = [
          generatedOtp,
          otpNotVerified,
          expireTime,
          phoneNumber,
        ]
        try {
          const setOTPResults = await pool.query(setOTPQuery, setOTPValues)

          if (setOTPResults.rowCount != 0) {
            // && sendOTPMessage(phoneNumber, generatedOtp)
            return res.status(200).json({
              success: true,
              message: `OTP sent to the number ending with ...${lastDigits}`,
              data: setOTPResults.rows,
            })
          }
        } catch (error) {
          console.log(error)
          return next(new ErrorHandler(false, `${error}`, 400))
        }
      }
    } catch (error) {
      console.log(error)
      return next(new ErrorHandler(false, `${error}`, 400))
    }

    const sendOTPQuery =
      "INSERT INTO user_registration (mobile_no, generated_otp) VALUES ($1,$2) RETURNING *"
    const sendOTPValues = [phoneNumber, generatedOtp]
    try {
      const sendOTPResults = await pool.query(sendOTPQuery, sendOTPValues)
      if (sendOTPResults.rowCount != 0) {
        // && sendOTPMessage(phoneNumber, generatedOtp)
        return res.status(200).json({
          success: true,
          message: `OTP sent to the number ending with ...${lastDigits}`,
          data: sendOTPResults.rows,
        })
      }
    } catch (error) {
      console.log(error)
      return next(new ErrorHandler(false, `${error}`, 400))
    }
  } catch (error) {
    console.log(error)
    return next(new ErrorHandler(false, `${error}`, 400))
  }
}

const verifyOneTimePasswordRegisterController = async (req, res, next) => {
  const { phoneNumber, combinedOTP } = req.body
  console.log(phoneNumber, combinedOTP)

  if (!phoneNumber || !combinedOTP) {
    return res.status(400).json({
      success: false,
      error: "Phone number and verification code are required",
    })
  }

  const otpVerified = 1
  try {
    const verifyUserQuery =
      "SELECT * FROM user_registration WHERE mobile_no = $1"
    const verifyUserValue = [phoneNumber]

    const verifyUserResults = await pool.query(verifyUserQuery, verifyUserValue)
    console.log("verifyUserResults:", verifyUserResults.rows[0].generated_otp)

    if (
      verifyUserResults.rowCount != 0 &&
      (verifyUserResults.rows[0].otp_verification != otpVerified ||
        verifyUserResults.rows[0].otp_verification == null)
    ) {
      console.log(
        verifyUserResults.rows[0].generated_otp === parseInt(combinedOTP)
      )
      console.log(typeof combinedOTP)
      console.log(verifyUserResults.rows[0].isotpexpiry)
      const presentTime = await new Date(currentTimeStamp.getTime())
        .toTimeString()
        .split(" ")[0]
      console.log(presentTime)

      if (parseInt(verifyUserResults.rows[0].generated_otp) === parseInt(combinedOTP)) {
        if (verifyUserResults.rows[0].isotpexpiry > presentTime) {
          const setOTPQuery =
            "UPDATE user_registration SET otp_verification = $1 WHERE mobile_no = $2"
          const setOTPValues = [otpVerified, phoneNumber]

          const setOTPResults = await pool.query(setOTPQuery, setOTPValues)

          if (setOTPResults.rowCount != 0) {
            const userData = {
              user: {
                user_id: verifyUserResults.rows[0].id,
                mobile_no: verifyUserResults.rows[0].mobile_no,
                user_Role: "userRoleAsTheCustomer",
              },
            }

            const options = {
              httpOnly: true,
              secure: true,
              sameSite: "strict",
            }

            const { accessToken, refreshToken } =
              await generateAccessAndRefreshTokens(userData)

            return res
              .status(200)
              .cookie("accessToken", accessToken, options)
              .cookie("refreshToken", refreshToken, options)
              .json({
                success: true,
                message: "Phone Number Verified successfully :)",
                tokens: {
                  accessToken,
                  refreshToken,
                },
                roles: {
                  role: "userRoleAsTheCustomer",
                },
              })
          }
        } else {
          return res.status(400).json({
            success: false,
            message: "Oops! The OTP you entered has expired.",
          })
        }
      } else {
        console.log("true")
        return res.status(400).json({
          success: false,
          message: "Oops! The OTP you entered is incorrect. Please try again.",
        })
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Oops! The OTP you entered is incorrect. Please try again.",
      })
    }
  } catch (error) {
    console.log(error)
    return next(new ErrorHandler(false, `${error}`, 402))
  }
}

const refreshAccessToken = async (req, res, next) => {
  //Getting Refresh Token
  const incomingAccessToken = req.cookies.refreshToken

  //Consoling Refresh Token
  console.log(req.cookies)
  console.log(incomingAccessToken)

  //Check The Refresh token if is null
  if (!incomingAccessToken) {
    return next(new ErrorHandler(false, `No incomming  Refresh token`, 402))
  }

  //Decoding Refresh Token to get information
  try {
    const decodedRefreshToken = jwt.verify(
      incomingAccessToken,
      process.env.JWT_SECERT_KEY
    )
    
    //Fetch the user from the database for the making the updation
    const findUserQuery = "SELECT * FROM user_registration WHERE id = $1"
    const findUser = await pool.query(findUserQuery, [
      parseInt(decodedRefreshToken.user.user_id),
    ])


    //Making Checks of null and if data is present
    if (findUser.rowCount != 0) {
      if (incomingAccessToken === findUser.rows[0]?.refresh_token) {
        const userData = {
          user: {
            user_id: findUser.rows[0].id,
            mobile_no: findUser.rows[0].mobile_no,
          },
        }

        //Generationg the new access and Refresh Token
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(userData)

        return res
          .status(200)
          .cookie("accessToken", accessToken, options)
          .cookie("refreshToken", refreshToken, options)
          .json({
            success: true,
            message: "Phone Number Verified successfully :)",
            tokens: {
              accessToken,
              refreshToken,
            },
            roles: {
              role: "userRoleAsTheCustomer",
            },
          })
      } else {
        // console.log("Refresh token does not match the one in the database");
        return next(new ErrorHandler(false, `Invalid refresh token`, 401))
      }
    } else {
      // console.log("User not found");
      return next(new ErrorHandler(false, `User not found`, 404))
    }
  } catch (error) {
    // console.log("JWT verification error:", error);
    return next(new ErrorHandler(false, `Invalid refresh token`, 401))
  }
}




const userLogoutController = async (req, res, next) => {
  const user = req.user
  console.log(user.user_id)
  console.log("Hello")
  const isUser = 0
  const logoutUserQuery =
    "UPDATE user_registration SET refresh_token = $1, otp_verification = $2 WHERE id = $3"
  const logoutUserValue = [null, isUser, user.user_id]
  try {
    const logoutUserResult = await pool.query(logoutUserQuery, logoutUserValue)
    console.log(logoutUserResult)
    if (logoutUserResult.rowCount != 0) {
      return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({
          success: true,
          message: "User Logged out successfully",
        })
    }
  } catch (error) {
    return next(new ErrorHandler(false, `${error}`, 401))
  }
}

const verifyUser = async (req, res) => {
  const { user_Role } = req.user
  if (user_Role === "userRoleAsTheCustomer") {
    console.log("userRoleAsTheCustomer")
    return res.status(200).json({
      success: true,
    })
  } else {
    return res.status(404).json({
      success: false,
      message: "Your Not Authorize!",
    })
  }
}

module.exports = {
  verifyOneTimePasswordRegisterController,
  sendOneTimePasswordRegisterController,
  userLogoutController,
  refreshAccessToken,
  verifyUser,
}
