import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import EditNotificationsSharpIcon from "@mui/icons-material/EditNotificationsSharp";
import GroupAddSharpIcon from "@mui/icons-material/GroupAddSharp";
import SchoolSharpIcon from "@mui/icons-material/SchoolSharp";
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import PaymentsIcon from '@mui/icons-material/Payments';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import ClassRoundedIcon from '@mui/icons-material/ClassRounded';




const Sidebar = () => {

  // This is the admin panel sidebar for the simpler navigation
  // UseState for making the button active when it is clicked to navigate to the particular page
  const [activeBtn, setActiveBtn] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(null);

  const handleBtn = (path) => {
    if (window.innerWidth < 768) {
      setActiveBtn(path);
      setIsExpanded(false);
    } else {
      setActiveBtn(path);
    }
  };

  const isActive = (path) => activeBtn === path;

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      <aside className="lg:static transition-all duration-300 bg-gray-1 min-h-screen bg-green-700">
        <div
          className={`fixed md:static md:h-full lg:flex flex-col justify-start items-start text-white bg-green-4 p-2 md:p-10 ${
            isExpanded
              ? "w-80 absolute lg:static h-full"
              : "w-6 hover:w-12 md:w-20 md:hover:20 static rounded-br-2xl rounded-tr-2xl"
          } md:rounded-none mb-2 transition-all duration-300`}
        >
          <div
            className={`w-full flex justify-end ${isExpanded ? "" : "md:ml-6"}`}
          >
            <button
              onClick={toggleSidebar}
              className="bg-green-3 p-2 md:p-3 rounded-full hover:bg-green-2 transition-all duration-300"
            >
              {isExpanded ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* <div className="w-full flex flex-col justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#000000" className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>
            <p className="text-sm text-gray-300">Admin</p>
          </div> */}

          <div className={`${isExpanded ? "block" : "hidden"} md:block`}>
            <div className="w-full flex flex-col py-4">
              {/* Admin Class Booking Panel */}
              <Link
                to="/admin/classbooked"
                onClick={() => handleBtn("classbooked")}
                className={`relative hover:bg-green-3 ${
                  isActive("classbooked") ? "bg-green-3" : ""
                } transition-all duration-300 rounded-2xl cursor-pointer flex ${
                  isExpanded
                    ? "p-4 m-1"
                    : "-m-[8px] md:-m-[20px] h-10 w-10 flex justify-center my-2 md:my-4"
                }`}
              >
                <span
                  className="px-2 flex justify-center items-center text-lg"
                  onMouseEnter={() => setIsHovered("classBookings")}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <ClassRoundedIcon/>
                </span>
                {isExpanded && <p className="text-lg">Class Bookings</p>}
                {!isExpanded && (
                  <p
                    className={`absolute bottom-0 left-10 p-[1px] px-[2px] bg-[#333] rounded text-white text-xs ${
                      isHovered === "classBookings" ? "" : "hidden"
                    }`}
                  >
                    Class&nbsp;Bookings
                  </p>
                )}
              </Link>

              {/* Admin Appointments Panel To see the number of Appointments in Total */}
              <Link
                to="/admin/appointment"
                onClick={() => handleBtn("appointment")}
                className={`relative hover:bg-green-3 ${
                  isActive("appointment") ? "bg-green-3" : ""
                } transition-all duration-300 rounded-2xl cursor-pointer flex ${
                  isExpanded
                    ? "p-4 m-1"
                    : "m-[8px] md:-m-[20px] h-10 w-10 flex justify-center my-2 md:my-4"
                }`}
              >
                <span
                  className="px-2 flex justify-center items-center text-lg"
                  onMouseEnter={() => setIsHovered("appointments")}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <AnalyticsRoundedIcon/>
                </span>
                {isExpanded && <p className="text-lg">Appointments</p>}
                {!isExpanded && (
                  <p
                    className={`absolute z-20 bottom-0 left-10 p-[1px] px-[2px] bg-[#333] rounded text-white text-xs ${
                      isHovered === "appointments" ? "" : "hidden"
                    }`}
                  >
                    Appointments
                  </p>
                )}
              </Link>

              {/* Admin Youtube And Testimonials panel to upload the iframe of the youtube videos and testimonial youtube videos of the users channels */}
              <Link
                to="/admin/youtube"
                onClick={() => handleBtn("youtube")}
                className={`relative hover:bg-green-3 ${
                  isActive("youtube") ? "bg-green-3" : ""
                } transition-all duration-300 rounded-2xl cursor-pointer flex ${
                  isExpanded
                    ? "p-4 m-1"
                    : "-m-[8px] md:-m-[20px] h-10 w-10 flex justify-center my-2 md:my-4"
                }`}
              >
                <span
                  className="px-2 flex justify-center items-center text-lg"
                  onMouseEnter={() => setIsHovered("videos")}
                  onMouseLeave={() => setIsHovered(null)}
                >
                 <YouTubeIcon/>
                </span>
                {isExpanded && <p className="text-lg">YT & Testimonials</p>}
                {!isExpanded && (
                  <p
                    className={`absolute bottom-0 left-10 p-[1px] px-[2px] bg-[#333] rounded text-white text-xs ${
                      isHovered === "videos" ? "" : "hidden"
                    }`}
                  >
                    YT&nbsp;&&nbsp;Testimonials
                  </p>
                )}
              </Link>

              {/* Admin Panel to fetch all the payments done for the Various Purpuses */}
              <Link
                to="/admin/payment"
                onClick={() => handleBtn("payment")}
                className={`relative hover:bg-green-3 ${
                  isActive("payment") ? "bg-green-3" : ""
                } transition-all duration-300 rounded-2xl cursor-pointer flex ${
                  isExpanded
                    ? "p-4 m-1"
                    : "-m-[8px] md:-m-[20px] h-10 w-10 flex justify-center my-2 md:my-4"
                }`}
              >
                <span
                  className="px-2 flex justify-center items-center text-xl"
                  onMouseEnter={() => setIsHovered("payments")}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <PaymentsIcon/>
                </span>
                {isExpanded && <p className="text-lg">Payments</p>}
                {!isExpanded && (
                  <p
                    className={`absolute bottom-0 left-10 p-[1px] px-[2px] bg-[#333] rounded text-white text-xs ${
                      isHovered === "payments" ? "" : "hidden"
                    }`}
                  >
                    Payments
                  </p>
                )}
              </Link>

              {/* Admin panel to fetch all the user Datas such as Phone number, name and etc */}
              <Link
                to="/admin/users"
                onClick={() => handleBtn("users")}
                className={`relative hover:bg-green-3 ${
                  isActive("users") ? "bg-green-3" : ""
                } transition-all duration-300 rounded-2xl cursor-pointer flex ${
                  isExpanded
                    ? "p-4 m-1"
                    : "-m-[8px] md:-m-[20px] h-10 w-10 flex justify-center my-2 md:my-4"
                }`}
              >
                <span
                  className="px-2 flex justify-center items-center text-lg"
                  onMouseEnter={() => setIsHovered("members")}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <CardMembershipIcon/>
                </span>
                {isExpanded && <p className="text-lg">Members</p>}
                {!isExpanded && (
                  <p
                    className={`absolute bottom-0 left-10 p-[1px] px-[2px] bg-[#333] rounded text-white text-xs ${
                      isHovered === "members" ? "" : "hidden"
                    }`}
                  >
                    Members
                  </p>
                )}
              </Link>

              {/* Admin Panel to set the slots for the Doctor in his free time */}
              <Link
                to="/admin/slots"
                onClick={() => handleBtn("slots")}
                className={`relative hover:bg-green-3 ${
                  isActive("slots") ? "bg-green-3" : ""
                } transition-all duration-300 rounded-2xl cursor-pointer flex ${
                  isExpanded
                    ? "p-4 m-1"
                    : "-m-[8px] md:-m-[20px] h-10 w-10 flex justify-center my-2 md:my-4"
                }`}
              >
                <span
                  className="px-2 flex justify-center items-center text-lg"
                  onMouseEnter={() => setIsHovered("setSlots")}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  
                 <AccessAlarmsIcon/>
                </span>
                {isExpanded && <p className="text-lg">Set Slots</p>}
                {!isExpanded && (
                  <p
                    className={`absolute bottom-0 left-10 p-[1px] px-[2px] bg-[#333] rounded text-white text-xs ${
                      isHovered === "setSlots" ? "" : "hidden"
                    }`}
                  >
                    Set&nbsp;Slots
                  </p>
                )}
              </Link>

              {/* Admin Panel to set the Class Date and Timings  */}
              <Link
                to="/admin/class"
                onClick={() => handleBtn("class")}
                className={`relative hover:bg-green-3 ${
                  isActive("class") ? "bg-green-3" : ""
                } transition-all duration-300 rounded-2xl cursor-pointer flex ${
                  isExpanded
                    ? "p-4 m-1"
                    : "-m-[8px] md:-m-[20px] h-10 w-10 flex justify-center my-2 md:my-4"
                }`}
              >
                <span
                  className="px-2 flex justify-center items-center text-lg"
                  onMouseEnter={() => setIsHovered("classUpdates")}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <SchoolSharpIcon />
                </span>
                {isExpanded && <p className="text-lg">Class Updates</p>}
                {!isExpanded && (
                  <p
                    className={`absolute bottom-0 left-10 p-[1px] px-[2px] bg-[#333] rounded text-white text-xs ${
                      isHovered === "classUpdates" ? "" : "hidden"
                    }`}
                  >
                    Class&nbsp;Updates
                  </p>
                )}
              </Link>

              {/* Admin Panel to add the Doctor If any new Doctor Joins  */}
              <Link
                to="/admin/addDoctor"
                onClick={() => handleBtn("doctor")}
                className={`relative hover:bg-green-3 ${
                  isActive("doctor") ? "bg-green-3" : ""
                } transition-all duration-300 rounded-2xl cursor-pointer flex ${
                  isExpanded
                    ? "p-4 m-1"
                    : "-m-[8px] md:-m-[20px] h-10 w-10 flex justify-center my-2 md:my-4"
                }`}
              >
                <span
                  className="px-2 flex justify-center items-center text-lg"
                  onMouseEnter={() => setIsHovered("addDoctor")}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <GroupAddSharpIcon />
                </span>
                {isExpanded && <p className="text-lg">Add Docter</p>}
                {!isExpanded && (
                  <p
                    className={`absolute bottom-0 left-10 p-[1px] px-[2px] bg-[#333] rounded text-white text-xs ${
                      isHovered === "addDoctor" ? "" : "hidden"
                    }`}
                  >
                    Add&nbsp;Doctor
                  </p>
                )}
              </Link>

              <Link
                to="/admin/notifications"
                onClick={() => handleBtn("notifications")}
                className={`relative hover:bg-green-3 ${
                  isActive("notifications") ? "bg-green-3" : ""
                } transition-all duration-300 rounded-2xl cursor-pointer flex ${
                  isExpanded
                    ? "p-4 m-1"
                    : "-m-[8px] md:-m-[20px] h-10 w-10 flex justify-center my-2 md:my-4"
                }`}
              >
                <span
                  className="px-2 flex justify-center items-center text-lg"
                  onMouseEnter={() => setIsHovered("notifications")}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <EditNotificationsSharpIcon />
                </span>
                {isExpanded && <p className="text-lg"> Notifications </p>}
                {!isExpanded && (
                  <p
                    className={`absolute bottom-0 left-10 p-[1px] px-[2px] bg-[#333] rounded text-white text-xs ${
                      isHovered === "notifications" ? "" : "hidden"
                    }`}
                  >
                    Notifications
                  </p>
                )}
              </Link>
              {isExpanded && (
                <div className="w-full flex flex-col justify-end flex-grow pb-16">
                  <p className="text-gray-200 font-thin text-xl ml-[25%]">
                    Version 1.0
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
