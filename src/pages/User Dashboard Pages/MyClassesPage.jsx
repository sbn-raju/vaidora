import React, { useEffect, useState } from 'react';
import { userProfile, classDetails } from '../../constants';
import { BsCalendar2Event } from "react-icons/bs";
import { FaClock, FaPhone } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { refreshUserToken } from '../../slices/refreshSlice.js';
import NoteBar from '../../components/NoteBar.jsx';
import CoPresentOutlinedIcon from '@mui/icons-material/CoPresentOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AddLinkOutlinedIcon from '@mui/icons-material/AddLinkOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { refreshTheAccessToken } from '../../slices/userSlice.js';


const formatDate = (isDateString) => {
  const options = { year: 'numeric', month: 'short', day: '2-digit'};
  const date = new Date(isDateString);
  return date.toLocaleDateString('en-GB', options).toUpperCase().replace(/ /g, ' ');
}

const formatTime = (timeString) => {
  // Create a Date object from the time string
  const timePart = timeString.split(":");

  const hours = timePart[0];
  const minutes = timePart[1];

  return `${hours}:${minutes}`;
};

const MyClassesPage = () => {
  document.title = "Class Bookings"
  const dispatch = useDispatch()
  const [classRecords, setClassRecords] = useState([]);
  useEffect(()=> {
    const fetchData = async ()=> {
      const userId = "123";
      const requestOptions= {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
      };

      try{

        const response = await axios.post('/api/v1/class_booking/user/classes/booked', requestOptions);
        console.log(response)
        const data = response.data
        console.log(data.data);
        setClassRecords(data?.data)

      } catch(error){
        console.log(error.response.status)
        if(error.response.status === 401){
          dispatch(refreshTheAccessToken())
        }
        console.log('Error occured', error);
        throw error;
      }
    }
    fetchData();
  }, []);

  return (
    <div className="h-screen w-full p-4 md:p-6 flex flex-col items-center bg-gray-1">
     
      <div className="w-full my-8 flex flex-col md:flex-row items-center bg-white border-[1px] border-gray-2 rounded-2xl md:px-10 py-3">
        <div className="flex flex-row items-center">
          {/* <h1 className='text-sm md:text-xl'>Hello <span className="font-semibold">{userProfile.Name}!!</span></h1>
          <span className="ml-4 border-[1px] border-l-gray-500 h-6"></span> Vertical Line */}
          <div className="flex justify-center items-center ml-4">
            <span className="text-md ml-4"><BsCalendar2Event /></span>
            <p className="text-[10px] md:text-sm ml-1">My Classes</p>
          </div>
        </div>
        
      </div>
      <NoteBar/>
      { classRecords.length !== 0 ? (
        <>
          <div className="w-full h-3/6 overflow-auto scrollbar">
            {classRecords?.map((classItem, index) => (
              <div key={index} className={`mb-5 p-4 px-10 rounded-2xl border-[1px] border-gray-2 bg-white shadow-md`}>
                <div className='w-full flex flex-row'>
                  <div className='w-11/12 md:w-9/12 flex flex-col gap-4 md:gap-2'>
                    <div className='grid grid-cols-2'>
                      <p className='text-lg md:text-base flex items-center md:font-medium'>
                       <CalendarTodayOutlinedIcon sx={{color: "green"}}/>&nbsp;
                        {formatDate(classItem.class_date)}
                      </p>
                      <p className='text-xs md:text-base flex items-center md:font-medium'>
                        <span className='mr-2 text-xl'>
                        <TimerOutlinedIcon sx={{color: "green"}}/>&nbsp;
                        </span>
                        {classItem.class_time}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 mt-2">
                      <p className='mr-3 text-xs md:text-sm flex justify-start items-center'>
                        <GroupsOutlinedIcon sx={{color: "green"}}/>&nbsp;
                        <span className='font-medium ml-2'>Batch No.:&nbsp;{classItem.class_id}</span>
                      </p>
                      <p className='mr-3 text-xs md:text-sm flex justify-start items-center'>
                        <CoPresentOutlinedIcon sx={{color: "green"}}/>&nbsp;
                        <span className='text-xs md:text-base md:font-medium ml-2'>{classItem.status == 1 && classItem.isactive == 1 ?"Completed" : classItem.status == 1 && classItem.isactive == null ? "Ongoing" : "Upcoming"}</span>
                      </p>
                    </div>
                  </div>

                  <div className='w-1/12 md:w-3/12 md:px-4 flex justify-center items-center'>
                    <button className={`${!classItem.class_link? 'bg-gray-400' : 'bg-green-4'} rounded-md px-2 py-1 md:px-8 text-white text-xs md:text-base`} disabled={!classItem.class_link}>
                      <Link to={classItem.class_link}>
                      <AddLinkOutlinedIcon/>&nbsp;Join
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full bg-white rounded-2xl border-[1px] border-gray-2 my-6 md:my-20 p-2 px-4 md:p-4 shadow-md">
            <p className='my-2 font-medium text-sm md:text-base'>Instructions:</p>
            <p className='my-2 text-[10px] md:text-sm'>Your privacy is important to us. We guarantee that your username and personal information will be kept confidential and will not be shared with any third parties. Feel safe knowing your data is secure.</p>
          </div>
        </>
      ) : (
        <div className='flex flex-col justify-center items-center h-screen'>
          <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="#999999" className="bi bi-file-earmark-x" viewBox="0 0 16 16">
            <path d="M6.854 7.146a.5.5 0 1 0-.708.708L7.293 9l-1.147 1.146a.5.5 0 0 0 .708.708L8 9.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 9l1.147-1.146a.5.5 0 0 0-.708-.708L8 8.293z"/>
            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
          </svg>
          <p style={{color:"#999999"}} className='text-2xl my-4'>No data to show</p>
        </div>
      )}
    </div>
  );
}

export default MyClassesPage;
