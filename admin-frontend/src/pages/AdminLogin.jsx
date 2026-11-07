import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginAdmin } from "../slices/adminSlice.js";
import { encryptData } from "../utils/encryptData.js";
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import axios from "axios";
import toast from "react-hot-toast";
import logo from "../assets/New Logo.png";
import BannerBeta from "../components/BannerBeta.jsx";

const AdminLogin = () => {
  document.title = "Admin Login | Dr. Ramachandra & Padma";
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // let usernameErrorMsg
  // let passwordErrorMsg
  // const usernameError = error === "Username is Required"? usernameErrorMsg = "Username is Required":null
  // const passwordError = error === "Password is Required" || error === "Incorrect Password"? passwordErrorMsg = "Password is Incorrect":null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const fetchAdminAuth = async (loginData) => {
    try {
      const response = await axios.post("/api/v1/admin/login", loginData, {
        withCredentials: true,
      });
      console.log(response);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const adminAuthMutation = useMutation({
    mutationFn: fetchAdminAuth,
    onSuccess: async (data) => {
      const token = data.data.token;
      const userRole = data.data.data[0].userRole;
      const encryptToken = await encryptData(token.toString());

      const encryptUserRole = await encryptData(userRole.toString());

      sessionStorage.setItem("admin_info", encryptToken);
      sessionStorage.setItem("user_Role", encryptUserRole);

      console.log(data.data);
      dispatch(loginAdmin(data.data));
      navigate("/admin/appointment");
      toast.success(data.data.message);
    },
    onError: async (data) => {
      toast.error(data.response.data.message || "Internal Server Error");
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    adminAuthMutation.mutate(loginData);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-[#F2F2F2] flex-col">
<div className="mb-10">
<BannerBeta/>
</div>
      <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-md h-auto">
        <div className="w-full flex flex-col justify-center items-center">
          <img src={logo} alt="Logo" className="h-20 w-20" />
          <h1 className="text-xl">Dr. Ramachandra &amp; Padma Naturopathy</h1>
        </div>
        <h2 className="text-lg font-semibold text-center mb-8 text-green-600">
          Admin Portal Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8" method="POST">
          <div>
            <label htmlFor="username">
              <PersonRoundedIcon sx={{color:"#757575"}}/>&nbsp;
              Username
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
          {/* <p className="text-red-600">{usernameError?usernameErrorMsg:null}</p> */}
          <div className="mt-3">
            <label htmlFor="password">
              <PasswordRoundedIcon sx={{color:"#757575"}}/>&nbsp;
              Password
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
          {/* <p className="text-red-600">{passwordError?passwordErrorMsg:null}</p> */}
          <div className="flex items-center flex-row-reverse">
            <div className="flex justify-center items-center flex-row-reverse">
              <label htmlFor="showButton" className="ml-2 text-blue-600">
                Show Password
              </label>
              <input
                type="checkbox"
                name="show"
                id="showButton"
                onChange={handleShow}
              />
            </div>
          </div>
          <button className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 transition duration-300 ease-in-out">
          Login&nbsp;<LoginRoundedIcon/>
          </button>
          {/* <p className="text-red-800">{error === "Username Not Found"?error:null}</p> */}
          {/* <p className="text-blue-600">{message?message:null}</p> */}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
