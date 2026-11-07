import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { refreshUserToken } from "../../slices/refreshSlice.js";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import MasksIcon from "@mui/icons-material/Masks";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { refreshTheAccessToken } from "../../slices/userSlice.js";

const formatDate = (isDateString) => {
  const options = { year: "numeric", month: "short", day: "2-digit" };
  const date = new Date(isDateString);
  return date
    .toLocaleDateString("en-GB", options)
    .toUpperCase()
    .replace(/ /g, " ");
};

const MyAppointmentsPage = () => {
  document.title = "User Appointments";
  const [appointmentRecords, setAppointmentRecords] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const requestOptions = {
        headers: { "Content-Type": "application/json" },
      };

      try {
        const response = await axios.post(
          "/api/v1/appointment/user/get-appointment",
          {},
          requestOptions
        );
        console.log(response);
        const data = response.data;
        console.log(data);
        setAppointmentRecords(data?.data ? data.data : []);
      } catch (error) {
        console.log(error.response.status);
        if (error.response.status === 401 || error.response.status === 403) {
          dispatch(refreshTheAccessToken());
        }
        console.log("Error occured", error);
        throw error;
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen w-full p-4 md:p-10 flex flex-col items-center bg-gray-1">
      <div className="w-full my-8 flex flex-col md:flex-row items-center bg-white border-[1px] border-gray-2 rounded-2xl md:px-10 py-3">
        <div className="flex flex-row items-center">
          <div className="flex justify-center items-center">
            <span className="text-md ml-4">
              <CalendarMonthOutlinedIcon />
            </span>
            <p className="text-[10px] md:text-sm ml-1">My Appointments</p>
          </div>
        </div>
      </div>
      {appointmentRecords.length !== 0 ? (
        <>
          <div className="w-full h-full md:h-3/6 overflow-auto scrollbar">
            {appointmentRecords?.map((appointment, index) => (
              <div
                key={index}
                className="mb-5 p-6 px-5 rounded-2xl border-[1px] border-gray-2 bg-white shadow-md"
              >
                <div className="w-full flex">
                  <div className="w-11/12 md:w-9/12 grid grid-cols-2 gap-4">
                    <p className="text-xs md:text-base flex items-center md:font-medium">
                      <CalendarTodayOutlinedIcon sx={{ color: "green" }} />
                      &nbsp;
                      {formatDate(appointment?.date)}
                    </p>
                    <p className="text-xs md:text-base flex items-center md:font-medium">
                      <AccessTimeOutlinedIcon sx={{ color: "green" }} />
                      &nbsp;
                      {appointment?.slot_start_time}
                    </p>
                    <p className="flex justify-start items-center">
                      <VaccinesOutlinedIcon sx={{ color: "green" }} />
                      &nbsp;
                      <span className="text-xs md:text-base md:font-medium">
                        {appointment?.purpose_of_visit}
                      </span>
                    </p>
                    <p className="flex justify-start items-center">
                      <MasksIcon sx={{ color: "green" }} />
                      &nbsp;
                      <span className="text-xs md:text-base md:font-medium">
                        {appointment?.name}
                      </span>
                    </p>
                  </div>

                  <div className="w-1/12 md:w-3/12 md:px-4 flex justify-center items-center">
                    <button className="hover:border-[1px] hover:border-green-4 p-2 rounded-lg flex justify-center items-center">
                      <CallOutlinedIcon sx={{ color: "#1b5e20" }} />
                      <p
                        style={{ color: "#1b5e20" }}
                        className="hidden md:block text-sm ml-2"
                      >
                        Contact for any queries
                      </p>
                    </button>
                  </div>
                  {/* <div className='w-1/4 px-6'>
                      <p className='text-xs mb-1'>
                        Schedule your reconsultation here, after the actual consultation
                      </p>
                      <CommonButton 
                        className='bg-green-4 pb-1 px-3 text-white white rounded-md'
                        onClick={handleCautionBox}
                      >
                        Reconsult
                      </CommonButton>
                    </div> */}
                </div>
              </div>
            ))}
          </div>

          <div className="w-full bg-white rounded-2xl border-[1px] border-gray-2 my-6 md:my-20 p-2 px-4 md:p-4 shadow-md">
            <p className="my-2 font-medium text-sm md:text-base">
              Instructions:
            </p>
            <p className="my-2 text-[10px] md:text-sm">
              Your privacy is important to us. We guarantee that your username
              and personal information will be kept confidential and will not be
              shared with any third parties. Feel safe knowing your data is
              secure.
            </p>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            fill="#999999"
            className="bi bi-file-earmark-x"
            viewBox="0 0 16 16"
          >
            <path d="M6.854 7.146a.5.5 0 1 0-.708.708L7.293 9l-1.147 1.146a.5.5 0 0 0 .708.708L8 9.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 9l1.147-1.146a.5.5 0 0 0-.708-.708L8 8.293z" />
            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
          </svg>
          <p style={{ color: "#999999" }} className="text-2xl my-4">
            No data to show
          </p>
        </div>
      )}
      {/* {isCautionBoxOpen && <CautionBox handleOkay={handleOkay} />} */}
    </div>
  );
};

export default MyAppointmentsPage;
