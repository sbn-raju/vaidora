import React, { useEffect, useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { navItems } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Page Assets/Home/New Logo.png";
import ClearIcon from "@mui/icons-material/Clear";
import MobileInput from "../MobileInput.jsx";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { useSelector } from "react-redux";

const HeaderHome = () => {
  const { token, user } = useSelector((state) => state.auth);

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAccountBoxOpen, setIsAccountBoxOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawer = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAccountBox = () => {
    navigate("/user/login")
  };

  const handleUserDashboard = () => {
    navigate("/user/profile");
  };




  return (
    <>
      <div
        className={`px-4 md:px-6 py-3 w-full flex flex-row justify-between items-center sticky top-0 bg-white text-green-1 ${
          isScrolled ? "shadow-lg" : "shadow-none"
        } z-50`}
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
        <div className="hidden md:flex flex-grow justify-center items-center space-x-4 md:space-x-6 lg:space-x-10">
          <ul className="flex flex-row text-sm md:text-base lg:text-lg space-x-4 md:space-x-6 lg:space-x-10 text-black">
            {navItems.map((item, index) => (
              <li key={index} className="hover:underline">
                <Link 
                to={item.label == "Appointment" || "Workshop" ? token != null && user != null ? item.href : "/user/login": item.href }
                className="pb-2">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:flex items-center ml-2 md:ml-4 lg:ml-6">
          {token != null && user != null ? (
            <button onClick={handleUserDashboard}>
              <AccountCircleIcon sx={{ fontSize: 40, color: "green" }} />
            </button>
          ) : (
            <button onClick={handleAccountBox} className="border-2 border-green-4 p-2 rounded-md">
              <div className="flex flex-row justify-center items-center">
                <p className="text-xl mb-1">Login</p>&nbsp;
                <LoginRoundedIcon sx={{ fontSize: 30, color: "#497246" }} />
              </div>
            </button>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={handleDrawer} className="text-3xl md:text-4xl">
            {drawerIsOpen ? <ClearIcon /> : <IoMenu />}
          </button>
        </div>
        {/* {isAccountBoxOpen && <MobileInput closeAccount={closeAccount} />} */}
      </div>
      {drawerIsOpen && (
        <div className="fixed z-10 w-full h-full top-0 left-0 bg-white transform transition-transform ease-in-out duration-300 md:hidden">
          <div className="flex justify-end p-4">
            <button
              onClick={handleDrawer}
              className="text-3xl md:text-4xl text-black"
            >
              <ClearIcon />
            </button>
          </div>
          <ul className="flex flex-col justify-start text-lg text-black mt-10">
            {navItems.map((item, index) => (
              <li
                key={index}
                className=" ml-2 mb-4 w-11/12 text-center flex justify-center border-b-2 border-black"
              >
                <Link
                  to={item.label == "Appointment" || "Workshop" ? token != null && user != null ? item.href : "/user/login": item.href }
                  className="ml-4 block w-full py-2 text-start"
                >
                  {item.icon && <item.icon sx={{color:"green"}}/>}
                  &nbsp;{item.label}
                </Link>
              </li>
            ))}
            <li className="ml-4 mt-10">
              {token != null && user != null ? (
                <button onClick={handleUserDashboard}>
                  <AccountCircleIcon sx={{ fontSize: 40, color: "green" }} />
                </button>
              ) : (
                <button onClick={handleAccountBox}>
                  <div className="flex flex-row justify-center items-center">
                    <p className="text-xl mb-1">Login</p>&nbsp;
                    <LoginRoundedIcon sx={{ fontSize: 30, color: "green" }} />
                  </div>
                </button>
              )}
            </li>
          </ul>
          {/* {isAccountBoxOpen && <MobileInput closeAccount={closeAccount} />} */}
        </div>
      )}
    </>
  );
};

export default HeaderHome;
