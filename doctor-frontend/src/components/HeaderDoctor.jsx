import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/New Logo.png";
import { logoutDoctor } from "../slices/doctorSlice.js";
import { useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";

const HeaderDoctor = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutDoctor());
  };
  return (
    <>
      <div
        className={`px-4 md:px-6 py-3 w-full flex flex-row justify-between items-center sticky top-0 bg-white text-green-1 z-50`}
      >
        <div className="flex items-center">
          <Link to="/">
            <img
              src={logo}
              alt="LogoImage"
              className="w-12 h-12 md:w-16 md:h-16 mx-[1px] md:mx-4"
            />
          </Link>
          <div className="pl-1 ml-4 md:mr-4">
            <h2 className="font-leagueSpartanRegular text-sm md:text-base lg:text-lg leading-tight text-green-1">
              Dr.Padma &amp; Dr.Ramachandra
            </h2>
            <p className="font-leagueSpartanRegular text-sm md:text-base lg:text-lg text-green-1">
              Naturopathy
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-green-300 p-3 rounded-md hover:bg-green-600"
        >
          <p>
            <LogoutIcon />
            &nbsp;Logout
          </p>
        </button>
      </div>
    </>
  );
};

export default HeaderDoctor;
