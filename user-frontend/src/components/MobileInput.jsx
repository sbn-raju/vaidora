import React from "react";
import { useState, useEffect, useRef } from "react";
import CommonButton from "../components/CommonButton.jsx";
import ClearIcon from '@mui/icons-material/Clear';
import OtpInput from "./OtpInput";
import MailLockIcon from '@mui/icons-material/MailLock';
import LoginIcon from '@mui/icons-material/Login';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



const MobileInput = ({ closeAccount }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOTPCardOpen, setIsOTPCardOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const sendOneTimePass = async (phoneNumber) => {
    try {
      const response = await axios.post(
        "/api/v1/auth/register/verify-Details/otp",
        {phoneNumber}
      );
      console.log(response);
      return response.data;
    } catch(error) {
      console.log(error);
      return error?.response?.data;
    }
  };

  const handleSendOTP = async () => {
    if (phoneNumber.length === 10) {
      const msg = await sendOneTimePass(phoneNumber);
      console.log(msg);
      if (msg.success) {
        toast.success(msg.message);
        setIsOTPCardOpen(true);
      } else {
        toast.error("Error in Connecting Server");
        setIsOTPCardOpen(false);
      }
      setErrorMsg();
    } else if (phoneNumber.length > 0 && phoneNumber.length !== 10) {
      setErrorMsg("Please enter valid mobile number");
    } else {
      setErrorMsg("Phone number is mandatory");
    }
  };

  const closeOTPCard = () => {
    setIsOTPCardOpen(false);
  };

 const navigate = useNavigate();
  const handleCloseButton = () =>{
    navigate(-1)
  }

  return (
    <>
      <div className="h-screen bg-black inset-0 fixed bg-opacity-75 w-full flex flex-col justify-center items-center">
        <div className="bg-white p-10 w-[300px] md:w-[400px] shadow-lg min-h-[200px] flex flex-col rounded-lg">
          <div className="flex justify-between mb-6">
            <h1 className="font-medium text-black">
              Sign In&nbsp;
              <LoginIcon />
            </h1>
            <CommonButton onClick={handleCloseButton}>
              <ClearIcon />
            </CommonButton>
          </div>
          <div className="">
            <label htmlFor="phoneInput" className="mb-0">
              Enter you 10 Digits Mobile Number Mobile
            </label>
            <input
              id={"phoneInput"}
              className={
                "w-full mt-0 border-2 p-2 rounded-lg border-green-600 focus:border-2 focus:border-green-400"
              }
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}
          </div>
          <CommonButton
            className="mt-4 bg-green-4 text-white px-4 py-2 rounded-xl"
            onClick={handleSendOTP}
          >
            Send OTP&nbsp;
            <MailLockIcon />
          </CommonButton>
        </div>
      </div>
      {isOTPCardOpen && (
        <OtpInput phoneNumber={phoneNumber} closeOTPCard={closeOTPCard} />
      )}
    </>
  );
};

export default MobileInput;
