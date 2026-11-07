import React, { useState } from "react";
import Input from "../components/Input.jsx";
import { useForm } from "react-hook-form";
import CommonButton from "../components/CommonButton.jsx";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loginDoctor } from "../slices/doctorSlice.js";
import { useDispatch, useSelector } from "react-redux";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import PasswordRoundedIcon from "@mui/icons-material/PasswordRounded";
import { encryptData } from "../utils/encryptData";
import BannerBeta from "../components/BannerBeta.jsx";
import logo from "../assets/New Logo.png";

const DoctorLogin = () => {
  document.title = "Doctor Login | Dr.Ramachandra & Padma";
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const loginDataSubmit = async (userData) => {
    console.log(userData);
    try {
      const response = await axios.post("/api/v1/doctor/auth/login", userData);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  const loginMutation = useMutation({
    mutationFn: loginDataSubmit,
    onSuccess: async(data) => {
      console.log(data);
      const doctorToken = data.token;
      const userRole = data.data[0].userRole;

      const encryptedToken = await encryptData(doctorToken.toString());
      const encryptedUserRole = await encryptData(userRole.toString());

      sessionStorage.setItem("doctor_info", encryptedToken);
      sessionStorage.setItem("user_Role", encryptedUserRole);

      dispatch(loginDoctor(data));
      navigate("/doctor/dashboard");
      toast.success(data.message);
    },
    onError: async(data) => {
      console.log(data);
      toast.error(data);
    },
  });

  const handleDoctorLogin = (event) => {
    event.preventDefault();
    console.log(loginData)
    loginMutation.mutate(loginData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleChangeState = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F2F2F2] flex-col">
      <div className="mb-10">
        <BannerBeta />
      </div>
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md h-auto">
        <div className="w-full flex flex-col justify-center items-center">
          <img src={logo} alt="Logo" className="h-20 w-20" />
          <h1 className="text-xl">Dr. Ramachandra &amp; Padma Naturopathy</h1>
        </div>
        <h2 className="text-lg font-semibold text-center mb-8 text-green-600">
          Doctor Portal Login
        </h2>
        <form onSubmit={handleDoctorLogin} className="space-y-8">
          <div>
            <label htmlFor="username">
              <PersonRoundedIcon sx={{ color: "#757575" }} />
              &nbsp; Username
              <sup className="text-red-500  text-sm font-extrabold">*</sup>
            </label>
            <input
              id="username"
              name="username"
              value={loginData.username}
              onChange={handleChange}
              required
              className="border-[1px] border-gray-300 w-full h-12 rounded-[5px] px-4"
              placeholder="Username"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="password">
              <PasswordRoundedIcon sx={{ color: "#757575" }} />
              &nbsp; Password
              <sup className="text-red-500 text-sm font-extrabold">*</sup>
            </label>
            <input
              id="password"
              name="password"
              type={`${showPassword ? "text" : "password"}`}
              value={loginData.password}
              onChange={handleChange}
              required
              className="border-[1px] border-gray-300 w-full h-12 rounded-[5px] px-4"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center flex-row-reverse">
            <div className="flex justify-center items-center flex-row-reverse">
              <label htmlFor="showButton" className="ml-2 text-blue-600">
                Show Password
              </label>
              <input
                type="checkbox"
                name="show"
                id="showButton"
                onChange={handleChangeState}
              />
            </div>
          </div>
          <CommonButton className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 transition duration-300 ease-in-out">
            Login&nbsp;
            <LoginRoundedIcon />
          </CommonButton>
        </form>
      </div>
    </div>
  );
};

export default DoctorLogin;
